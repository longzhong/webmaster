using System.Data;
using LONG.Bussiness;
namespace LONG.Tags
{
    public class Temp_Content:System.Web.UI.Page
    {

        public string Get_Content(int docid, string temp, int pid, string src)
        {
            //ʵ������ز�����
            IOStream stream = new IOStream();//���ع��߿�
            GlobalTags gb = new GlobalTags();//������ǩ��
            ArticleTags at = new ArticleTags();//����ҳ��ǩ
            PublicSelect ps = new PublicSelect();
            if (docid == 0)
                return null;
            DataView dw = ps.Getps("documents", "*", "id=" + docid + "");
            //System.Diagnostics.Debug.WriteLine("docid:" + docid);
            //System.Diagnostics.Debug.WriteLine("category:" + dw[0]["category"].ToString());
            //��ȡ��Ŀ��Ϣ
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
            //����ҳ�浼���ǩ
            content = gb.Analysis_Include(content, temp);
            //��Ŀ��ǩ����
            content = gb.Analysis_Menu(content, cid);
            //����
            string sitemap = gb.Analysis_Sitemap(cid); // + " > " + dw[0]["title"].ToString()
            //��ȡͷ��������ǩ(����,�ؼ���,����)����
            content = gb.Analysis_Global(null, dw[0]["title"].ToString(), dw[0]["keywords"].ToString(), dw[0]["description"].ToString(), content, sitemap);
            //����������ǩ����
            content = gb.Analysis_Channels(content);
            content = gb.Analysis_Article(content, cid);
            content = gb.Analysis_Link(content);
            content = gb.Analysis_Freedom(content);
            //�ĵ���ǩ����
            content = at.Analysis_Content(content, docid, pid, src);
            content = gb.Analysis_Category(content, cid); //���±�ǩ
            content = gb.Analysis_Linkids(content);
            //��չ�ֶα�ǩ����
            content = gb.Analysis_AlbumList(content, docid);
            //��չ�ֶα�ǩ����
            content = gb.Analysis_Attr(content, docid);
            content = gb.Analysis_IF(content);
            content = content.Replace("{category.title}", parenttitle);

            return content;
        }
    }
}
