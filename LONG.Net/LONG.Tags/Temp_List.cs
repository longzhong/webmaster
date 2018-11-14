using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.IO;
using System.Data;
using LONG.Bussiness;

namespace LONG.Tags
{
    public class Temp_List : System.Web.UI.Page
    {
        PublicSelect ps = new PublicSelect();
        public string Get_List(string temp, int cid, int pid, int htmcount)
        {
            //实例化相关操作类
            IOStream stream = new IOStream();//加载Ayong工具库
            GlobalTags gb = new GlobalTags();//公共标签类
            ListTags lt = new ListTags();//列表标签类
            PublicSelect ps = new PublicSelect();
            //获取栏目信息
            DataView column = ps.Getps("sys_model_category", "*", "id=" + cid);
            string parenttitle = string.Empty;
            if(column[0]["parentid"].ToString() == "0"){
                parenttitle = column[0]["title"].ToString();
            }else{
                parenttitle = ps.Getps("sys_model_category", "*", "id=" + int.Parse(column[0]["parentid"].ToString())).Table.Rows[0]["title"].ToString();
            }
            string content = "";
            if (column[0]["attribute"].ToString() == "1")
            {
                content = stream.ReadFile(temp + "article/" + column[0]["indextemplate"].ToString());
            }
            else if (column[0]["attribute"].ToString() == "2")
            {
                content = stream.ReadFile(temp + "article/" + column[0]["listtemplate"].ToString());
            }
            //解析页面导入标签
            content = gb.Analysis_Include(content, temp);
            //栏目标签解析
            content = gb.Analysis_Menu(content, cid);
            content = gb.Analysis_Category(content, cid); //文章标签
            //导航
            string sitemap = gb.Analysis_Sitemap(cid);
            //获取头部三个标签(标题,关键字,描述)
            content = gb.Analysis_Global(null, column[0]["title"].ToString(), column[0]["keywords"].ToString(), column[0]["description"].ToString(), content, sitemap);
            //公共独立标签解析
            content = gb.Analysis_Channels(content);
            content = gb.Analysis_Article(content, cid);
            content = gb.Analysis_Link(content);
            content = gb.Analysis_Freedom(content);
            //栏目标签解析
            content = lt.Analysis_Page(content, pid, cid, null, htmcount);
            content = gb.Analysis_IF(content);
            content = content.Replace("{category.title}", parenttitle);
            return content;

        }
    }
}
