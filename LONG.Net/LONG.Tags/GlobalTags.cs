/**********************************************************************************
 * ClassName:       GlobalTags
 * Description:     公用标签处理类
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
    public class GlobalTags
    {
        Tags_sql sql = new Tags_sql();
        //============> 自由SQL标签解析

        /// <summary>
        /// 自由SQL标签解析
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        public string Analysis_Freedom(string content)
        {
            //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText="";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:freedom\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:freedom\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string sqlstr = null;
                sqlstr = TagVal(Attributes,"sql");
                if (sqlstr == null)
                {
                    sqlstr = "";
                }
                if (sqlstr!= "")
                {
                    PublicSelect ps = new PublicSelect();
                    DataView dv = ps.Selectps(sqlstr);

                    
                    if (dv.Count > 0)
                    {
                        //循环行
                        foreach (DataRow row in dv.Table.Rows)
                        {
                            StringBuilder txt = new StringBuilder();
                            txt.Append(Text);
                            //循环列
                            foreach (DataColumn dc in dv.Table.Columns)
                            {
                                txt = txt.Replace("{field." + dc.ColumnName + "}", row[dc.ColumnName].ToString());
                            }
                            str.Append(txt);
                        }
                        content = content.Replace(AllText, str.ToString());
                    }
                    else
                    {
                        content = content.Replace(AllText, "");
                    }
                }
                else
                {
                    content = content.Replace(AllText,"");
                }
            }
            return content;
        }

        public string Analysis_IF(string content)
        {
            //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{if\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/if\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {
                //存储新的内容
                StringBuilder str = new StringBuilder();
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string key = null;
                key = TagVal(Attributes, "key");
                string val = null;
                val = TagVal(Attributes, "val");
                string mod = null;
                mod = TagVal(Attributes, "mod");
                StringBuilder txt = new StringBuilder();
                txt.Append(Text);
                if (mod == "equals" && key == val) //是否相等
                {                    
                    content = content.Replace(AllText, txt.ToString());
                }
                else if (mod == "notempty" && !string.IsNullOrEmpty(val)) //是否为空
                {
                    content = content.Replace(AllText, txt.ToString());
                }
                else
                {
                    content = content.Replace(AllText, "");
                }
            }
            return content;
        }

        public string Analysis_Attr(string content, int docid)
        {
            string AllText = "";//存储新的内容
            //StringBuilder str = new StringBuilder();
            PublicSelect ps = new PublicSelect();
            string sqlstr = "select attrname from sys_model_attr";
            DataView dv = ps.Selectps(sqlstr);
            string attrvalue = string.Empty;

            if (dv.Count > 0)
            {
                //循环行
                foreach (DataRow row in dv.Table.Rows)
                {
                    //循环列
                    foreach (DataColumn dc in dv.Table.Columns)
                    {
                        DataView dvv = sql.GetDocumentAttr(row[dc.ColumnName].ToString(),docid) as DataView;
                        if (dvv.Count > 0) {
                            attrvalue = dvv[0]["contents"].ToString();
                        }
                        content = content.Replace("{lw:attr." + row[dc.ColumnName].ToString() + "}", attrvalue);
                    }
                }
            }
            else
            {
                content = content.Replace(AllText, "");
            }
            return content;
        }
        public string Analysis_Children(string content)
        {

            //标签解析开始---

            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:children\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:children\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();

                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string cid = null;//栏目ID
                cid = TagVal(Attributes, "cid");
                if (cid == null)
                {
                    cid = "0";
                }

                //获取数据

                DataView dv = sql.GetChildren(cid) as DataView;

                if (dv.Count > 0)
                {
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //栏目连接地址
                        StringBuilder url = new StringBuilder();
                        //判断栏目属性
                        if (int.Parse(row["attribute"].ToString()) == 0) //单页面
                        {
                            url.Append("{htmlpath}" + row["filename"].ToString() + row["fileex"].ToString());
                        }
                        else if (int.Parse(row["attribute"].ToString()) == 1 || int.Parse(row["attribute"].ToString()) == 2) //频道和列表页
                        {
                            url.Append(row["dirname"].ToString() + "/");
                        }
                        else //外部链接
                        {
                            url.Append(row["linkurl"].ToString());
                        }
                        txt = txt.Replace("{child.title}", row["title"].ToString());
                        txt = txt.Replace("{child.linkurl}", url.ToString());
                        txt = txt.Replace("{child.cid}", row["id"].ToString());
                        str.Append(txt);
                    }

                }
                //替换当前标签调用的数据
                content = content.Replace(AllText, str.ToString());
            }
            return content;
        }
        public string Analysis_AlbumList(string content, int docid)
        {
            //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            DataView dv = sql.GetAlbum(docid) as DataView;
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:albumlist\}(?<text>[\s\S]*?)\{/lw:albumlist\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //判断是否有数据
                if (dv.Count > 0)
                {
                    int i = 1;
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        string imgurl = row["filename"].ToString();
                        //txt = txt.Replace("{field.imgurl}", imgurl.Substring(0, imgurl.LastIndexOf('.')) + "_small" + imgurl.Substring(imgurl.LastIndexOf('.')));
                        txt = txt.Replace("{field.imgurl}", imgurl.Replace("_small", ""));
                        txt = txt.Replace("{field.simgurl}", imgurl);
                        txt = txt.Replace("{i}", i.ToString());
                        txt = txt.Replace("{field.imgname}", row["picname"].ToString());
                        txt = txt.Replace("{field.imgdes}", row["filedes"].ToString());
                        str.Append(txt);
                        i++;
                    }
                    content = content.Replace(AllText, str.ToString());
                }
                else
                {
                    content = content.Replace(AllText, "");
                }
            }
            return content;
        }  

        //============> 友情连接标签
        public string Analysis_Advert(string content)
        {
            //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:advert\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:advert\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string cid = null;
                string max = null;
                cid = TagVal(Attributes, "cid");
                if (cid == null)
                {
                    cid = "0";
                }
                max = TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "20";
                }
                DataView dv = sql.GetAdvert(cid, max) as DataView;
                //判断是否有数据
                if (dv.Count > 0)
                {                    
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        txt = txt.Replace("{field.title}", row["title"].ToString());
                        txt = txt.Replace("{field.linkurl}", row["linkurl"].ToString());
                        txt = txt.Replace("{field.imgurl}", row["imgurl"].ToString());
                        str.Append(txt);
                    }
                    content = content.Replace(AllText, str.ToString());
                }
                else
                {
                    content = content.Replace(AllText, "");
                }
            }
            return content;

        }

        //============> 友情连接标签
        public string Analysis_Linkids(string content)
        {
            //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:linkids\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:linkids\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string ids = null;
                string max = null;

                ids = TagVal(Attributes, "ids");
                if (ids == "0" || ids == "")
                {
                    ids = "0";
                }
                else {
                    ids = ids.Substring(0, ids.Length - 1);
                }
                max = TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "8";
                }
                DataView dv = sql.GetLinkids(ids, max) as DataView;
                //判断是否有数据
                if (dv.Count > 0)
                {
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //System.Diagnostics.Debug.WriteLine("txt:" + txt.ToString());
                        //处理连接地址
                        DataView category = sql.GetDocCategory(row["category"].ToString()) as DataView;
                        if (category.Count > 0)
                        {
                            string url = "";
                            if (int.Parse(category[0]["pageclass"].ToString()) == 1) //静态页
                            {
                                if (category[0]["readstyle"].ToString() == "{did}")
                                {
                                    url = category[0]["path"].ToString() + row["id"].ToString() + category[0]["fileex"].ToString();
                                }
                                else
                                {
                                    url = category[0]["path"].ToString() + row["filename"].ToString() + category[0]["fileex"].ToString();
                                }
                            }
                            else
                            {
                                url = row["filename"].ToString();
                            }
                            txt = txt.Replace("{field.linkurl}", url);
                        }
                        else
                        {
                            txt = txt.Replace("{field.linkurl}", "");
                        }
                        txt = txt.Replace("{field.title}", row["title"].ToString());
                        txt = txt.Replace("{field.imgurl}", row["imgurl"].ToString());
                        str.Append(txt);
                        //System.Diagnostics.Debug.WriteLine("str:" + str.ToString());
                    }
                    content = content.Replace(AllText, str.ToString());
                }
                else
                {
                    content = content.Replace(AllText, "");
                }
            }
            return content;

        }

        //============> 友情连接标签
        public string Analysis_Link(string content)
        {
             //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText="";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:link\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:link\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string cid = null;
                string max = null;

                cid = TagVal(Attributes, "cid");
                if (cid == null)
                {
                    cid = "0";
                }
                max = TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "8";
                }
                string col = null;
                col=TagVal(Attributes,"col");
                if (col == null)
                {
                    col = "0";
                }
                DataView dv = sql.GetLink(cid, max) as DataView;
                //判断是否有数据
                if (dv.Count > 0)
                {
                    StringBuilder txt = new StringBuilder();
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        txt.Append(Text);
                        txt = txt.Replace("{field.title}", row["title"].ToString());
                        txt = txt.Replace("{field.linkurl}", row["linkurl"].ToString());
                        txt = txt.Replace("{field.imgurl}", row["imgurl"].ToString());

                        str.Append(txt);
                    }
                    content = content.Replace(AllText, str.ToString());
                }
                else
                {
                    content = content.Replace(AllText, "");
                }
            }
            return content;

        }
        /// <summary>
        /// 面包屑导航获取方法
        /// </summary>
        /// <param name="cid"></param>
        /// <returns></returns>
        public string Analysis_Sitemap(int cid)
        {
            StringBuilder str = new StringBuilder();
            if (cid != 0)
            {
                //获取当前栏目的parent值
                PublicSelect ps = new PublicSelect();
                string parent = ps.Getps("sys_model_category", "parentid", "id=" + cid + "").Table.Rows[0]["parentid"].ToString();
                DataView pw = ps.Getps("sys_model_category", "id,attribute,title,pageclass,path,fileex,liststyle,dirname,linkurl", "id=" + int.Parse(parent) + "") as DataView;
                foreach (DataRow row in pw.Table.Rows)
                {
                    //栏目连接地址
                    StringBuilder purl = new StringBuilder();
                    //判断栏目属性
                    if (int.Parse(row["attribute"].ToString()) == 0 || int.Parse(row["attribute"].ToString()) == 1 || int.Parse(row["attribute"].ToString()) == 2)
                    {
                        purl.Append(row["path"].ToString());
                    }
                    else //外部链接
                    {
                        purl.Append(row["linkurl"].ToString());
                    }
                    str.Append("<a href=\"/");
                    str.Append(purl);
                    str.Append("\" title=\"");
                    str.Append(row["title"].ToString());
                    str.Append("\">");
                    str.Append(row["title"].ToString());
                    str.Append("</a>");
                    str.Append(" &raquo; ");
                }
                

                //获取列表页导航
                DataView dw = sql.GetSitemap(cid) as DataView;

                foreach (DataRow row in dw.Table.Rows)
                {
                    if (int.Parse(row["id"].ToString()) == cid)
                    {
                        //栏目连接地址
                        StringBuilder url = new StringBuilder();
                        //判断栏目属性
                        if (int.Parse(row["attribute"].ToString()) == 0) //单页
                        {
                            url.Append(row["path"].ToString() + row["fileex"].ToString());
                        }
                        else if (int.Parse(row["attribute"].ToString()) == 1 || int.Parse(row["attribute"].ToString()) == 2) //频道页/列表页
                        {
                            url.Append(row["path"].ToString());
                        }
                        else //外部链接
                        {
                            url.Append(row["linkurl"].ToString());
                        }
                        str.Append("<a href=\"/");
                        str.Append(url);
                        str.Append("\" title=\"");
                        str.Append(row["title"].ToString());
                        str.Append("\">");
                        str.Append(row["title"].ToString());
                        str.Append("</a>");

                    }
                }
            }
            return str.ToString();
        }

        //============> 公共标签({lw:global.field})
        /// <summary>
        /// 公共标签解析
        /// </summary>
        /// <param name="title">网站标题</param>
        /// <param name="key">关键字</param>
        /// <param name="intro">描述</param>
        /// <param name="content">解析内容</param>
        /// <returns></returns>
        public string Analysis_Global(string sitetitle, string title,string keyworods,string description, string content,string sitemap)
        {
            //变动标签
            if (!String.IsNullOrEmpty(sitetitle))
            {
                content = content.Replace("{lw:global.sitetitle}", sitetitle);
            }
            else
            {
                content = content.Replace("{lw:global.sitetitle}", "");
            }
            if (!String.IsNullOrEmpty(title))
            {
                content = content.Replace("{lw:global.title}", title);
            }
            else
            {
                content = content.Replace("{lw:global.title}", "");
            }            
            content = content.Replace("{lw:global.keywords}", keyworods);
            content = content.Replace("{lw:global.description}", description);
            //固定标签
            LONG.Bussiness.PublicSelect ps = new PublicSelect();
            //导航加上首页链接
            //sitemap = "<a href=\"/\" title=\"首页\">首页</a> &raquo; " + sitemap;
            //sitemap = + sitemap;
            content = content.Replace("{lw:global.navigation}",sitemap);
            return content;
        }

        //============> {lw:include file=""}标签解析
        /// <summary>
        /// 页面导入标签解析
        /// </summary>
        /// <param name="content"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public string Analysis_Include(string content,string path)
        {
            Regex r = new Regex(@"(\{lw:include\s+(?<attributes>[^\]]*?)\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            //标签解析开始---
            //获取属性
            string Attributes = "";
            string AllText = "";
            //存储新的内容
            //string str = "";
            foreach (Match m in r.Matches(content))
            {
                //获取属性
                Attributes = m.Groups["attributes"].ToString();
                AllText = m.Groups[0].Value.ToString();
                string file = null;
                file=TagVal(Attributes, "file");
                if (file == null)
                {
                    //获取属性参数
                    content = content.Replace(AllText, "");
                }
                else
                {
                    //读取导入标签内容
                    IOStream stream = new IOStream();
                    string str = stream.ReadFile(path+file);
                    content = content.Replace(AllText,str);
                }
            }
            return content;
        }

        //============> Article标签
        /// <summary>
        /// 解析文章调用标签
        /// </summary>
        /// <param name="content">包含标签的页面内容</param>
        /// <param name="cid">指定栏目ID</param>
        /// <returns></returns>
        public string Analysis_Article(string content, int colid)
        {
            //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:article\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:article\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string type = null;//栏目类型(top,self,son)

                type = TagVal(Attributes, "type");
                if (type == null)
                {
                    type = "new";
                }
                string mid = null;//栏目ID
                mid = TagVal(Attributes, "mid");
                if (mid == null)
                {
                    mid = "0";
                }
                string cid = null;//栏目ID
                cid = TagVal(Attributes, "cid");
                if (cid == null)
                {
                    cid = colid.ToString();
                }
                string rid = null;//栏目ID
                rid = TagVal(Attributes, "rid");
                if (rid == null)
                {
                    rid = "0";
                }
                string iss = null;//是否显示单页面
                iss = TagVal(Attributes, "iss");
                if (iss == null)
                {
                    iss = "0";
                }
                string max = null;//显示行数
                max = TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "8";
                }
                //获取数据
                DataView dv = sql.GetArticle(type, mid, cid, rid, iss, max) as DataView;
                //循环替换数据
                if (dv.Count > 0)
                {
                    //存储新的内容
                    StringBuilder str = new StringBuilder();
                    int i = 1;
                    string OldText = Text;
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        Text = Analysis_Attr(OldText, int.Parse(row["id"].ToString()));
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //标签解析
                        //索引标签
                        txt = txt.Replace("{field.docid}", row["id"].ToString());
                        txt = txt.Replace("{field.cid}", row["cid"].ToString());
                        txt = txt.Replace("{field.imgurl}", row["imgurl"].ToString());
                        txt = txt.Replace("{field.click}", row["clicks"].ToString());
                        txt = txt.Replace("{i}", i.ToString());

                        txt = txt.Replace("{field.title}", row["title"].ToString());
                        txt = txt.Replace("field.color", row["color"].ToString());
                        txt = txt.Replace("{field.summary}", row["summary"].ToString());


                        txt = txt.Replace("{field.keywords}", row["keywords"].ToString());
                        txt = txt.Replace("{field.intro}", row["description"].ToString());
                        //处理连接地址
                        PublicSelect ps = new PublicSelect();
                        DataView column = ps.Getps("sys_model_category", "*", "id="+ row["cid"].ToString());
                        if (column.Count > 0)
                        {
                            string url = column[0]["path"].ToString() + row["filename"].ToString() + column[0]["fileex"].ToString();                            
                            txt = txt.Replace("{field.linkurl}", url);
                        }
                        else {
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

                            format = TagVal(att, "format");

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
                        i++;                        
                        str.Append(txt);
                    }
                    //替换整个标签的数据
                    content = content.Replace(AllText, str.ToString());
                }
                else
                {
                    content = content.Replace(AllText, "");
                }
            }
            //返回数据
            return content;
        }

        //============> 栏目标签解析
        public string Analysis_Channels(string content)
        {
            //标签解析开始---
            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:channels\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:channels\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {
                //存储新的内容
                StringBuilder str = new StringBuilder();
                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                string cid = null;//栏目ID
                cid = TagVal(Attributes, "cid");
                if (cid == null)
                {
                    cid = "0";
                }
                DataView dv = sql.GetChannels(cid) as DataView;
                if (dv.Count > 0)
                {
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //栏目连接地址
                        StringBuilder url = new StringBuilder();
                        //判断栏目属性
                        if (int.Parse(row["attribute"].ToString()) == 2) //列表页
                        {
                            if (int.Parse(row["pageclass"].ToString()) == 1) //静态页
                            {
                                url.Append(row["path"].ToString());
                                url.Append(row["liststyle"].ToString().Replace("{dirname}", row["dirname"].ToString()).Replace("{cid}", row["id"].ToString()).Replace("_{pageid}", ""));
                                url.Append(row["fileex"].ToString());
                            }
                            else //动态页
                            {
                                url.Append(row["dirname"].ToString() + "/?cid=");
                                url.Append(row["id"].ToString());
                                url.Append("&page=1");
                            }
                        }
                        else if (int.Parse(row["attribute"].ToString()) == 1 || int.Parse(row["attribute"].ToString()) == 0) //频道页
                        {
                            if (int.Parse(row["pageclass"].ToString()) == 1) //静态页
                            {
                                url.Append(row["path"].ToString());
                            }
                            else //动态页
                            {
                                url.Append(row["path"].ToString());
                                url.Append(row["defaultname"].ToString());
                            }
                        }
                        else //外部链接
                        {
                            url.Append(row["linkurl"].ToString());
                        }
                        txt = txt.Replace("{channels.cid}", row["id"].ToString());
                        txt = txt.Replace("{channels.title}", row["title"].ToString());
                        txt = txt.Replace("{channels.linkurl}", url.ToString());
                        str.Append(txt);
                    }
                    //替换当前标签调用的数据
                    content = content.Replace(AllText, str.ToString());
                }
                else
                {
                    content = content.Replace(AllText, "");
                }
               
            }
            return content;

        }
        /// <summary>
        /// 导航标签显示
        /// </summary>
        /// <param name="content"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        public string Analysis_Menu(string content, int colid)
        {

            //标签解析开始---

            string Attributes ="";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:menu\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:menu\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();

                Attributes=m.Groups["attributes"].ToString();
                Text=m.Groups["text"].ToString();
                AllText=m.Groups[0].Value.ToString();
                //获取相关属性
                string max = null;//显示数量
                string type = null;//栏目类型(top,left)
                string cid = null;//栏目ID

                type = TagVal(Attributes, "type");
                if (type == null)
                {
                    type = "top";
                }
                cid = TagVal(Attributes, "cid");
                if (cid == null)
                {
                    cid = colid.ToString();
                }
                max = TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "4";
                }

                //获取数据

                DataView dv = sql.GetMenu(max) as DataView;

                if (dv.Count > 0)
                {
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //栏目连接地址
                        StringBuilder url = new StringBuilder();
                        //判断栏目属性
                        if (int.Parse(row["attribute"].ToString()) == 2) //列表页
                        {
                            url.Append(row["dirname"].ToString() + "/?cid=");
                            url.Append(row["id"].ToString());
                            url.Append("&page=1");
                        }
                        else if (int.Parse(row["attribute"].ToString()) == 1 || int.Parse(row["attribute"].ToString()) == 0) //频道页
                        {
                            url.Append(row["dirname"].ToString() + "/");
                        }
                        else //外部链接
                        {
                            url.Append(row["linkurl"].ToString());
                        }
                        txt = txt.Replace("{menu.title}", row["title"].ToString());
                        txt = txt.Replace("{menu.headtitle}", row["headtitle"].ToString());
                        txt = txt.Replace("{menu.cid}", row["id"].ToString());
                        txt = txt.Replace("{menu.linkurl}", url.ToString());
                        str.Append(txt);
                    }

                }
                //替换当前标签调用的数据
                content = content.Replace(AllText, str.ToString());
               

            }

            return content;
        }

        /// <summary>
        /// 菜单栏循环标签显示
        /// </summary>
        /// <param name="content"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        public string Analysis_Category(string content, int colid)
        {

            //标签解析开始---

            string Attributes = "";//存储属性
            string Text = "";//存储标签Text
            string AllText = "";
            //实例化正则对象
            Regex r = new Regex(@"(\{lw:category\s+(?<attributes>[^\]]*?)\}(?<text>[\s\S]*?)\{/lw:category\})", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            foreach (Match m in r.Matches(content))
            {

                //存储新的内容
                StringBuilder str = new StringBuilder();

                Attributes = m.Groups["attributes"].ToString();
                Text = m.Groups["text"].ToString();
                AllText = m.Groups[0].Value.ToString();
                //获取相关属性
                string max = null;//显示数量
                string type = null;//栏目类型(top,left)
                string cid = null;//栏目ID

                type = TagVal(Attributes, "type");
                if (type == null)
                {
                    type = "top";
                }
                cid = TagVal(Attributes, "cid");
                if (cid == null)
                {
                    cid = colid.ToString();
                }
                max = TagVal(Attributes, "max");
                if (max == null)
                {
                    max = "20";
                }

                //获取数据

                DataView dv = sql.GetCategory(type, cid, max) as DataView;

                if (dv.Count > 0)
                {
                    foreach (DataRow row in dv.Table.Rows)
                    {
                        StringBuilder txt = new StringBuilder();
                        txt.Append(Text);
                        //栏目连接地址
                        StringBuilder url = new StringBuilder();
                        //判断栏目属性
                        if (int.Parse(row["attribute"].ToString()) == 1 || int.Parse(row["attribute"].ToString()) == 0 || int.Parse(row["attribute"].ToString()) == 2) //频道页,单页,列表页
                        {
                            url.Append(row["path"].ToString());
                        }
                        else //外部链接
                        {
                            url.Append(row["linkurl"].ToString());
                        }
                        txt = txt.Replace("{field.cid}", row["id"].ToString());
                        txt = txt.Replace("{field.title}", row["title"].ToString());
                        txt = txt.Replace("{field.linkurl}", url.ToString());
                        str.Append(txt);
                    }

                }
                //替换当前标签调用的数据
                content = content.Replace(AllText, str.ToString());
            }
            return content;
        }

        //============> 获取属性值的方法
        /// <summary>
        /// 获取标签属性值
        /// </summary>
        /// <param name="tag">属性集合</param>
        /// <param name="tagName">标签名</param>
        /// <returns>返回属性值</returns>
        public string TagVal(string tag, string tagName)
        {
            Regex r = new Regex(@"(?<key>\w+)\s*=\s*(?<value>" + "\"" + "[^\"]*\")", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            foreach (Match m in r.Matches(tag))
            {
                if (m.Groups["key"].ToString().Trim().ToLower() == tagName.ToLower())
                {
                    return m.Groups["value"].ToString().ToLower().Replace("\"", "");
                }
            }
            return null;
        }
    }
}
