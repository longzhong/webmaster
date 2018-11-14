/**********************************************************************************
 * ClassName:       ListTags
 * Description:     Loop��ǩ�ͷ�ҳ��ǩ�����ദ����
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
        //��ȡ���������б�  
        GlobalTags gb = new GlobalTags();
        Tags_sql sql = new Tags_sql();
        /// <summary>
        /// ��ҳ��ǩ����
        /// </summary>
        /// <param name="content">��������</param>
        /// <param name="cid">��ĿID</param>
        /// <param name="pid">pageҳ</param>
        /// <returns></returns>
        public string Analysis_Page(string content,int pid, int cid,string categorylist,int htmcount)
        {
            //ʵ������ҳ���ݲ�����
            Formpage page = new Formpage();
            //��ȡ��ѯ����
            string where = "id=" + cid;
            //string categorylist = string.Empty;
            //��ѯ����Ŀ����Ϣ
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
            //�����ȡ��ǩ��Ϣ
            Regex r = new Regex(@"(\{lw:page\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:page\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            //��ǩ������ʼ---

            string Attributes = "";//�洢����
            string Text = "";//�洢��ǩText
            string AllText = "";
            foreach (Match m in r.Matches(content))
            {
                //��ȡ�����������
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();


                string max = null;
                max = gb.TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "10";
                }
                
                /*��ҳStart*************************/
                //��ѯ��¼����
                DataView total = page.PageRow("documents", "id", int.Parse(max), 1, "category in(" + categorylist + ")") as DataView;

                int rownum = int.Parse(total[0]["total"].ToString());
                int pagesize = int.Parse(max);
                int rowcount = 0;
                //�ж���ҳ��
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
                //�ж��Ƿ��վ�̬ҳ������������ʾ���ҳ��
                if (htmcount != 0 && htmcount <= rowcount)
                {
                    rowcount = htmcount;
                }
                //��ǩ�滻
                string txt = Text;
                txt = txt.Replace("{field.total}",rownum.ToString());
                txt = txt.Replace("{field.current}", pid.ToString());//��ǰҳ
                txt = txt.Replace("{field.amount}", rowcount.ToString());//��ҳ��
                //��Ŀ���ӵ�ַ
                StringBuilder url = new StringBuilder();
                //�ж���Ŀ����
                url.Append(column[0]["path"].ToString());
                url.Append(column[0]["dirname"].ToString()+"_list_{page}"+ column[0]["fileex"].ToString());
                string newurl = url.ToString();
                txt = txt.Replace("{field.index}", newurl.Replace("{page}", "1"));
           
                //���һҳ
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
                txt = txt.Replace("{field.front}", newurl.Replace("{page}", (front.ToString() == "1" ? "1" :  front.ToString())));//��һҳ
                txt = txt.Replace("{field.next}", newurl.Replace("{page}", (next.ToString() == "1" ? "1" : next.ToString())));//��һҳ
                //��������ҳ��ǩ
                //�����ȡ��ǩ��Ϣ
                //TODO
                //ʵ�����������
                Regex reg = new Regex(@"(\{lw:number\}(?<text>[\s\S]*?)\{/lw:number\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                //�洢�µ�����
                StringBuilder str = new StringBuilder();
                str.Append(" ");
                string NewText = "";
                string NewAllText = "";
                foreach (Match ma in reg.Matches(txt))
                {
                    StringBuilder src = new StringBuilder();
                    //�洢�µ�����
                    NewText = ma.Groups["text"].ToString();
                    NewAllText = ma.Groups[0].Value.ToString();
                    str.Append(NewText.Replace("{field.url}", newurl.ToString().Replace("{page}","1")));  
                    str = str.Replace("{field.count}", "1");
                    if (rowcount > 1)
                    {
                        //ѭ�����ɷ�ҳ����
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
                            //�滻��ǩ
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
                /*��ҳEnd***************************/

                content = content.Replace(AllText,txt);
                content = Analysis_Loop(content, (page.PageView_Bywhere("documents", "id", int.Parse(max), pid, "category in (" + categorylist + ")") as DataView).Table);
            }
            return content;
        }
        public string Analysis_Loop(string content, DataTable dt)
        {
            //System.Diagnostics.Debug.WriteLine("content:" + content);
            //��ǩ������ʼ---
            string Text = "";//�洢��ǩText
            string AllText = "";
            PublicSelect ps = new PublicSelect();
            //ʵ�����������
            Regex r = new Regex(@"(\{lw:loop\}(?<text>[\s\S]*?)\{/lw:loop\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {
                //�洢�µ�����
                StringBuilder str = new StringBuilder();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                int index = 1;
                foreach (DataRow row in dt.Rows)
                {
                    Text = gb.Analysis_Attr(Text, int.Parse(row["id"].ToString()));
                    StringBuilder txt = new StringBuilder();
                    txt.Append(Text);
                    //��ǩ����
                    //������ǩ
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
                    //�������ӵ�ַ
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
                    //����ʱ��
                    Regex r1 = new Regex(@"(\{field.writertime\s+(?<attributes>[^\]]*?)\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                    string att = "";//�洢����
                    string all = "";
                    string format = null;
                    foreach (Match m1 in r1.Matches(txt.ToString()))
                    {
                        //��ȡ����
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
                        //�滻ʱ���ǩ
                        txt = txt.Replace(all, format);
                    }
                    str.Append(txt);
                }
                if (string.IsNullOrEmpty(str.ToString()))
                    str.Append("��Ǹ����ʱδ�������");
                //�滻������ǩ������
                content = content.Replace(AllText, str.ToString());
            }
            return content;
        }
    }
}
