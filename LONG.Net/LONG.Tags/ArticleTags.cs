/**********************************************************************************
 * ClassName:       ArticleTags
 * Description:     内容页标签处理
 * ********************************************************************************/
using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
using System.Data;
using System.Configuration;
using LONG.Bussiness;
using LONG.DataAccess;
using System.Web;
using System.Collections;

namespace LONG.Tags
{
    public class ArticleTags
    {
        public string Analysis_Content(string cont,int docid,int pid,string src)
        { 
            //标签解析开始---
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:about\}(?<text>[\s\S]*?)\{/lw:about\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(cont))
            {
                StringBuilder str = new StringBuilder();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();

                Tags_sql sql = new Tags_sql();
                GlobalTags gb = new GlobalTags();
                PublicSelect ps = new PublicSelect();

                if (docid != 0)
                {
                    DataTable dt = (sql.GetContent(docid) as DataView).Table;

                    foreach (DataRow row in dt.Rows)
                    {
                        Text = gb.Analysis_Attr(Text, int.Parse(row["id"].ToString()));
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //获取栏目信息
                        DataView column = ps.Getps("sys_model_category", "*", "id=" + int.Parse(row["category"].ToString()));
                        //文档ID
                        txt = txt.Replace("{lw:field.docid}", row["id"].ToString());
                        //标题
                        txt = txt.Replace("{lw:field.title}", row["title"].ToString());
                        //栏目ID
                        txt = txt.Replace("{lw:field.cid}", row["category"].ToString());
                        //标签
                        txt = txt.Replace("{lw:field.tags}", row["tags"].ToString());
                        //浏览次数
                        txt = txt.Replace("{lw:field.click}", row["clicks"].ToString());
                        //标题颜色
                        txt = txt.Replace("{lw:field.color}", row["color"].ToString());
                        //关键字
                        txt = txt.Replace("{lw:field.keywords}", row["keywords"].ToString());
                        //描述
                        txt = txt.Replace("{lw:field.description}", row["description"].ToString());
                        //关联文章
                        txt = txt.Replace("{lw:field.linkids}", (row["linkids"].ToString() == null ? "0" : row["linkids"].ToString()));

                        txt = txt.Replace("{lw:field.summary}", row["summary"].ToString());

                        //缩略图
                        string imgurl = row["imgurl"].ToString();
                        if (imgurl.Contains("_small"))
                        {
                            txt = txt.Replace("{lw:field.imgurl}", imgurl.Replace("_small", ""));
                            txt = txt.Replace("{lw:field.simgurl}", imgurl);
                        }
                        else
                        {
                            if (imgurl.Length > 0)
                            {
                                txt = txt.Replace("{lw:field.imgurl}", imgurl);
                                txt = txt.Replace("{lw:field.simgurl}", imgurl.Substring(0, imgurl.LastIndexOf('.')) + "_small" + imgurl.Substring(imgurl.LastIndexOf('.')));
                            }
                            else
                            {
                                txt = txt.Replace("{lw:field.imgurl}", "");
                            }
                        }
                        //内容
                        txt = txt.Replace("{lw:field.content}", row["contents"].ToString());
                        //上一篇
                        //查询上一页信息
                        DataView front = sql.GetNextOrFront(docid, "front") as DataView;
                        if (front.Count > 0)
                        {
                            string url = front[0]["filename"].ToString() + column[0]["fileex"].ToString();
                            txt = txt.Replace("{lw:field.front}", "<a href='" + url + "' title='" + front[0]["title"].ToString() + "'>" + front[0]["title"].ToString() + "</a>");
                        }
                        else
                        {
                            txt = txt.Replace("{lw:field.front}", "无");
                        }
                        //下一篇
                        DataView next = sql.GetNextOrFront(docid, "next") as DataView;
                        if (next.Count > 0)
                        {
                            string href = next[0]["filename"].ToString() + column[0]["fileex"].ToString();
                            txt = txt.Replace("{lw:field.next}", "<a href='" + href + "' title='" + next[0]["title"].ToString() + "'>" + next[0]["title"].ToString() + "</a>");

                        }
                        else
                        {
                            txt = txt.Replace("{lw:field.next}", "无");
                        }
                        //处理时间
                        Regex r2 = new Regex(@"(\{lw:field.writertime\s+(?<attributes>[^\]]*?)\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                        string att = "";//存储属性
                        string all = "";
                        string format = null;
                        string txt2 = "";
                        foreach (Match m2 in r2.Matches(txt.ToString()))
                        {
                            //获取属性
                            att = m2.Groups["attributes"].ToString();
                            all = m2.Groups[0].Value.ToString();

                            format = gb.TagVal(att, "format");
                            DateTime time = DateTime.Parse(row["createdate"].ToString());

                            if (format != null)
                            {

                                format = format.Replace("yyyy", time.Year.ToString());

                                format = format.Replace("mm", time.Month.ToString());

                                format = format.Replace("dd", time.Day.ToString());
                            }
                            else
                            {
                                format = time.Date.ToString();
                            }
                            //替换时间标签
                            txt2 = format;
                        }
                        if (!string.IsNullOrEmpty(txt2))
                        {
                            txt = txt.Replace(all, txt2);
                        }
                        str.Append(txt);
                    }
                }
                if (string.IsNullOrEmpty(str.ToString()))
                    str.Append("抱歉，暂时未添加数据");                    
                //替换整个标签的数据
                cont = cont.Replace(AllText, str.ToString());
            }
            return cont;
        }
        
        private StringBuilder Analysis_Paging(string content,string art,int pid,int docid,string src,bool html)
        {
                StringBuilder builder = new StringBuilder();
                /*分页Start*************************/
                Regex r = new Regex(@"(#p#)", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                int number = r.Matches(art).Count;
                //处理分页
                //标签解析开始---
                string Text = "";//存储标签Text
                string AllText = "";
                //实例化正则对象
                Regex p = new Regex(@"(\{lw:field.page\}(?<text>[\s\S]*?)\{/lw:field.page\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

                foreach (Match m in p.Matches(content))
                {
                    //存储新的内容
                    Text = m.Groups["text"].ToString();
                    AllText = m.Groups[0].Value.ToString();

                    //判断内容中是否有分页符
                    if (number > 0)
                    {
                        /************获取url地址Start**************/
                         string kzname="";
                         string filename="";
                        if (src != "")
                        {
                            kzname = Path.GetExtension(src);
                            filename= src.Replace(kzname, "");
                        }
                        string newurl = "";
                        if (html)
                        {
                            newurl = filename + "_{page}" + kzname;
                        }
                        else
                        {
                            newurl = "/article.aspx?docid="+docid+"&page={page}";
                        }
                        /************获取URL地址End****************/
                        number= number + 1;
                        //处理首页-下一页-上一页-最后一页 分页标签
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //首页
                        txt = txt.Replace("{field.index}", src);

                        //最后一页
                        txt = txt.Replace("{field.last}", newurl.Replace("{page}",number.ToString()));
                        int front = 1;
                        int next = 1;
                        if (pid > 1)
                        {
                            front = pid - 1;

                        }
                        if (pid == number)
                        {
                            next = pid;
                        }
                        else
                        {
                            next = pid + 1;
                        }
                        //上一页
                        if (front == 1)
                        {
                            txt = txt.Replace("{field.front}", src);
                        }
                        else
                        {
                            txt = txt.Replace("{field.front}", newurl.Replace("{page}",front.ToString()));
                        }
                        //下一页

                        txt = txt.Replace("{field.next}", newurl.Replace("{page}",next.ToString()));
                        //处理数字页标签
                        //正则获取标签信息
                        //实例化正则对象
                        Regex reg = new Regex(@"(\{lw:number\}(?<text>[\s\S]*?)\{/lw:number\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                        //存储新的内容
                        StringBuilder str = new StringBuilder();
                        string NewText = "";
                        string NewAllText = "";
                        foreach (Match ma in reg.Matches(txt.ToString()))
                        {
                            //存储新的内容
                            NewText = ma.Groups["text"].ToString();
                            NewAllText = ma.Groups[0].Value.ToString();


                            str.Append(NewText.Replace("{field.url}", src));
                            str = str.Replace("{field.count}", "1");
                            
                            //循环生成分页连接
                            for (int i = 2; i < number; i++)
                            {
                                string s = NewText;
                                //s.Append(NewText);
                                if (pid > 9)
                                {
                                    if (i < (pid - 4) && i > 1)
                                    {
                                        continue;
                                    }
                                   
                                }
                                if (i > (pid + 4) && i < number)
                                {
                                    break;
                                }
                                //替换标签
                                s = s.Replace("{field.url}", newurl.Replace("{page}",i.ToString()));
                                s = s.Replace("{field.count}", i.ToString());
                                str.Append(s);
                            }
                            str.Append(NewText.Replace("{field.url}", newurl.Replace("{page}",number.ToString())).Replace("{field.count}", number.ToString()));
                        }
                        if (NewAllText != "")
                        {
                            txt = txt.Replace(NewAllText, str.ToString());
                        }
                        /*分页End***************************/
                        /*************内容截取Start******************/
                        ArrayList substr = GetSubString(art, number);//存储已经截取的字符
                        //art=art.Replace("#p#","ん");
                        //string[] substr = art.Split('ん');
                       
                        //替换内容
                        content = content.Replace("{lw:field.content}",substr[(pid-1)].ToString());
                        /*************内容截取End********************/
                         content = content.Replace(AllText, txt.ToString());

                    }
                    else
                    {
                        content = content.Replace("{lw:field.content}",art);
                        content = content.Replace(AllText, "");
                    }
                   

                }
                
           
            builder.Append(content);
            return builder;
        }
        private ArrayList GetSubString(string str,int number)
        {
            ArrayList list = new ArrayList();
            string substr = str;
            //int length = 0;
            for (int i = 0; i < number; i++)
            {
                if (i<number-1)
                {
                    //截取字符串
                    list.Add(substr.Substring(0, substr.IndexOf("#p#")));
                    substr = substr.Remove(0,substr.IndexOf("#p#")+3);
                }    
                if(i==number-1)
                {
                    list.Add(substr);
                }
            }
            return list;
        }
    }
}
