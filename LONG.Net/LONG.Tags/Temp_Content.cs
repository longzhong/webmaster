using System.Data;
using LONG.Bussiness;
namespace LONG.Tags
{
    public class Temp_Content:System.Web.UI.Page
    {

        public string Get_Content(int docid, string temp, int pid, string src)
        {
            //实例化相关操作类
            IOStream stream = new IOStream();//加载工具库
            GlobalTags gb = new GlobalTags();//公共标签类
            ArticleTags at = new ArticleTags();//内容页标签
            PublicSelect ps = new PublicSelect();
            if (docid == 0)
                return null;
            DataView dw = ps.Getps("documents", "*", "id=" + docid + "");
            //System.Diagnostics.Debug.WriteLine("docid:" + docid);
            //System.Diagnostics.Debug.WriteLine("category:" + dw[0]["category"].ToString());
            //获取栏目信息
            int cid = int.Parse(dw[0]["category"].ToString());
            DataView column = ps.Getps("sys_model_category", "readtemplate,parentid,title", "id=" + cid + "");
            string parenttitle = string.Empty;
            if (column[0]["parentid"].ToString() == "0")
            {
                parenttitle = column[0]["title"].ToString();
            }
            else
            {
                parenttitle = ps.Getps("sys_model_category", "title", "id=" + int.Parse(column[0]["parentid"].ToString())).Table.Rows[0]["title"].ToString();
            }
            string content = stream.ReadFile(temp + "article/" + column[0]["readtemplate"].ToString());
            //解析页面导入标签
            content = gb.Analysis_Include(content, temp);
            //栏目标签解析
            content = gb.Analysis_Menu(content, cid);
            //导航
            string sitemap = gb.Analysis_Sitemap(cid); // + " > " + dw[0]["title"].ToString()
            //获取头部三个标签(标题,关键字,描述)数据
            content = gb.Analysis_Global(null, dw[0]["title"].ToString(), dw[0]["keywords"].ToString(), dw[0]["description"].ToString(), content, sitemap);
            //公共独立标签解析
            content = gb.Analysis_Channels(content);
            content = gb.Analysis_Article(content, cid);
            content = gb.Analysis_Link(content);
            content = gb.Analysis_Freedom(content);
            //文档标签解析
            content = at.Analysis_Content(content, docid, pid, src);
            content = gb.Analysis_Category(content, cid); //文章标签
            content = gb.Analysis_Linkids(content);
            //扩展字段标签解析
            content = gb.Analysis_AlbumList(content, docid);
            //扩展字段标签解析
            content = gb.Analysis_Attr(content, docid);
            content = gb.Analysis_IF(content);
            content = content.Replace("{category.title}", parenttitle);

            return content;
        }
    }
}
