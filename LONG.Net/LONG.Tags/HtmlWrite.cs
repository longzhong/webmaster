using System;
using System.Collections.Generic;
using System.Text;
using LONG.Tags;
using System.Data;
using System.Text.RegularExpressions;
using System.IO;
using LONG.Bussiness;
namespace LONG.Tags
{
    public class HtmlWrite : System.Web.UI.Page
    {
        /// <summary>
        /// 静态文档写入
        /// </summary>
        /// <param name="row"></param>
        public void WriteContent(int docid, string basetemplates)
        {
            Temp_Content cont = new Temp_Content();//文章数据调用类
            IOStream stream = new IOStream();//文件读取类
            Tags_sql sql = new Tags_sql();
            PublicSelect ps = new PublicSelect();//公用数据库操作类
            //获取文章信息
            DataView dw = sql.GetContentView("id=" + docid + "") as DataView;
            DataView row = ps.Getps("sys_model_category", "id,dirname,readstyle,attribute,defaultname,fileex,path", "id=" + int.Parse(dw[0]["category"].ToString()) + "");
            int cid = int.Parse(row[0]["id"].ToString());

            //循环生成
            foreach (DataRow dr in dw.Table.Rows)
            {
                //获取文档生成路径
                string path = row[0]["path"].ToString() + row[0]["readstyle"].ToString() + row[0]["fileex"].ToString();
                if (row[0]["attribute"].ToString() == "0")
                    path = row[0]["path"].ToString() + row[0]["defaultname"].ToString() + row[0]["fileex"].ToString();
                string src = path;
                //替换路径中自定义的变量
                path = path.Replace("{did}", dr["id"].ToString());
                path = path.Replace("{filename}", dr["filename"].ToString());
                //获取存放路径(如果没有其存放目录则创建存放目录)
                string folder = Server.MapPath("~//" + row[0]["path"].ToString());

                if (!System.IO.Directory.Exists(folder))
                {
                    stream.CreateFolder(folder);
                }

                string content = GetContent(cont, docid, 1, src, basetemplates);
                stream.WriteFile(Server.MapPath("~//" + path), content);
            }
        }
        //获取内容页内容
        string GetContent(Temp_Content cont, int docid, int page, string src, string basetemplates)
        {
            return cont.Get_Content(docid, Server.MapPath("~//" + basetemplates), page, src);
        }
    }
}
