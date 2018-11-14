/**********************************************************************************
 * ClassName:       ListTags
 * Description:     Loop标签和分页标签处理类处理类
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
    public class ListTags
    {
        //获取参数属性列表  
        GlobalTags gb = new GlobalTags();
        Tags_sql sql = new Tags_sql();
        /// <summary>
        /// 分页标签解析
        /// </summary>
        /// <param name="content">解析内容</param>
        /// <param name="cid">栏目ID</param>
        /// <param name="pid">page页</param>
        /// <returns></returns>
        public string Analysis_Page(string content,int pid, int cid,string categorylist,int htmcount)
        {
            //实例化分页数据操作类
            Formpage page = new Formpage();
            //获取查询条件
            string where = "id=" + cid;
            //string categorylist = string.Empty;
            //查询该栏目的信息
            PublicSelect ps = new PublicSelect();
            DataView column = ps.Getps("sys_model_category","*",where);
            if (String.IsNullOrEmpty(categorylist))
            {
                DataView clist = ps.Getps("sys_model_category", "*", "parentid=" + cid);
                if(clist.Table.Rows.Count > 0)
                {
                    foreach (DataRow row in clist.Table.Rows)
                    {
                        categorylist += row["id"].ToString() + ",";
                    }
                    categorylist = categorylist.Substring(0, categorylist.Length - 1);
                    categorylist = categorylist + "," + cid.ToString();
                }
                else
                {
                    categorylist = cid.ToString();
                }
                
            }            
            //System.Diagnostics.Debug.WriteLine("categorylist:" + categorylist);
            //正则获取标签信息
            Regex r = new Regex(@"(\{lw:page\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:page\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            //标签解析开始---

            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            foreach (Match m in r.Matches(content))
            {
                //获取正则相关属性
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();


                string max = null;
                max = gb.TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "10";
                }
                
                /*分页Start*************************/
                //查询记录总数
                DataView total = page.PageRow("documents", "id", int.Parse(max), 1, "category in(" + categorylist + ")") as DataView;

                int rownum = int.Parse(total[0]["total"].ToString());
                int pagesize = int.Parse(max);
                int rowcount = 0;
                //判断总页码
                if (rownum % pagesize == 0)
                {
                    rowcount = rownum / pagesize;
                }
                else
                {
                    rowcount = rownum / pagesize + 1;
                }
                if (rowcount == 0)
                {
                    rowcount = 1;
                }
                //判断是否按照静态页生成设置来显示最大页数
                if (htmcount != 0 && htmcount <= rowcount)
                {
                    rowcount = htmcount;
                }
                //标签替换
                string txt = Text;
                txt = txt.Replace("{field.total}",rownum.ToString());
                txt = txt.Replace("{field.current}", pid.ToString());//当前页
                txt = txt.Replace("{field.amount}", rowcount.ToString());//总页数
                //栏目连接地址
                StringBuilder url = new StringBuilder();
                //判断栏目属性
                url.Append(column[0]["path"].ToString());
                url.Append(column[0]["dirname"].ToString()+"_list_{page}"+ column[0]["fileex"].ToString());
                string newurl = url.ToString();
                txt = txt.Replace("{field.index}", newurl.Replace("{page}", "1"));
           
                //最后一页
                txt = txt.Replace("{field.last}", newurl.Replace("{page}", (rowcount.ToString() == "1" ? "1" : rowcount.ToString())));
              
                int front = 1;
                int next = 1;
                if (pid > 1)
                {
                    front = pid - 1;
                   
                }
                if (pid == rowcount)
                {
                    next = pid;
                }
                else
                {
                    next = pid + 1;
                }
                txt = txt.Replace("{field.front}", newurl.Replace("{page}", (front.ToString() == "1" ? "1" :  front.ToString())));//上一页
                txt = txt.Replace("{field.next}", newurl.Replace("{page}", (next.ToString() == "1" ? "1" : next.ToString())));//下一页
                //处理数字页标签
                //正则获取标签信息
                //TODO
                //实例化正则对象
                Regex reg = new Regex(@"(\{lw:number\}(?<text>[\s\S]*?)\{/lw:number\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                //存储新的内容
                StringBuilder str = new StringBuilder();
                str.Append(" ");
                string NewText = "";
                string NewAllText = "";
                foreach (Match ma in reg.Matches(txt))
                {
                    StringBuilder src = new StringBuilder();
                    //存储新的内容
                    NewText = ma.Groups["text"].ToString();
                    NewAllText = ma.Groups[0].Value.ToString();
                    str.Append(NewText.Replace("{field.url}", newurl.ToString().Replace("{page}","1")));  
                    str = str.Replace("{field.count}", "1");
                    if (rowcount > 1)
                    {
                        //循环生成分页连接
                        for (int i = 2; i < rowcount; i++)
                        {
                            string s = NewText;
                            int nums = 4;
                            //s.Append(NewText);
                            if (pid > 9)
                            {
                                if (i < (pid - 4) && i > 1)
                                {
                                    continue;
                                }

                            }
                            if (i > (pid + 4) && i < rowcount)
                            {
                                break;
                            }
                            //替换标签
                            s = s.Replace("{field.url}", newurl.Replace("{page}", i.ToString()));
                            s = s.Replace("{field.count}", i.ToString());
                            str.Append(s);
                        }
                        str.Append(NewText.Replace("{field.url}", newurl.Replace("{page}", rowcount.ToString()).ToString()).Replace("{field.count}", rowcount.ToString()));
                    }  
                }
                if (NewAllText != "")
                {
                    txt = txt.Replace(NewAllText, str.ToString());
                }
                /*分页End***************************/

                content = content.Replace(AllText,txt);
                content = Analysis_Loop(content, (page.PageView_Bywhere("documents", "id", int.Parse(max), pid, "category in (" + categorylist + ")") as DataView).Table);
            }
            return content;
        }
        public string Analysis_Loop(string content, DataTable dt)
        {
            //System.Diagnostics.Debug.WriteLine("content:" + content);
            //标签解析开始---
            string Text = "";//存储标签Text
            string AllText = "";
            PublicSelect ps = new PublicSelect();
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:loop\}(?<text>[\s\S]*?)\{/lw:loop\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {
                //存储新的内容
                StringBuilder str = new StringBuilder();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                int index = 1;
                foreach (DataRow row in dt.Rows)
                {
                    Text = gb.Analysis_Attr(Text, int.Parse(row["id"].ToString()));
                    StringBuilder txt = new StringBuilder();
                    txt.Append(Text);
                    //标签解析
                    //索引标签
                    txt = txt.Replace("{field.index}", index.ToString());
                    index++;

                    txt = txt.Replace("{field.docid}", row["id"].ToString());
                    txt = txt.Replace("{field.cid}", row["category"].ToString());
                    txt = txt.Replace("{field.imgurl}", row["imgurl"].ToString());
                    txt = txt.Replace("{field.click}", row["clicks"].ToString());
                    txt = txt.Replace("{field.summary}", row["summary"].ToString());
                    txt = txt.Replace("{field.title}", row["title"].ToString());
                    txt = txt.Replace("{field.color}", row["color"].ToString());
                    txt = txt.Replace("{field.date}", row["createdate"].ToString());
                    txt = txt.Replace("{field.keywords}",row["keywords"].ToString());
                    txt = txt.Replace("{field.intro}",row["description"].ToString());
                    //处理连接地址
                    string path = ps.Getps("sys_model_category", "path", "id=" + int.Parse(row["category"].ToString())).Table.Rows[0]["path"].ToString();
                    DataView category = sql.GetDocCategory(row["category"].ToString()) as DataView;
                    if (!String.IsNullOrEmpty(category[0]["path"].ToString()))
                    {
                        string url = "";
                        url = path + row["filename"].ToString() + category[0]["fileex"].ToString();
                        txt = txt.Replace("{field.linkurl}", url);
                    }
                    else
                    {
                        txt = txt.Replace("{field.linkurl}", "");
                    }
                    //处理时间
                    Regex r1 = new Regex(@"(\{field.writertime\s+(?<attributes>[^\]]*?)\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                    string att = "";//存储属性
                    string all = "";
                    string format = null;
                    foreach (Match m1 in r1.Matches(txt.ToString()))
                    {
                        //获取属性
                        att = m1.Groups["attributes"].ToString();
                        all = m1.Groups[0].Value.ToString();

                        format =gb.TagVal(att, "format");

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
                        txt = txt.Replace(all, format);
                    }
                    str.Append(txt);
                }
                if (string.IsNullOrEmpty(str.ToString()))
                    str.Append("抱歉，暂时未添加数据");
                //替换整个标签的数据
                content = content.Replace(AllText, str.ToString());
            }
            return content;
        }
    }
}
