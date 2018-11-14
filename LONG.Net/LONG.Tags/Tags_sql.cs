using System;
using System.Collections.Generic;
using System.Text;
using LONG.DataAccess;
using System.Data;
using System.Data.Common;
using System.Collections;

namespace LONG.Tags
{
    /// <summary>
    /// 标签解析数据读取类
    /// </summary>
    public class Tags_sql
    {
/**************************************文档部分Start*******************************************/
        
        /// <summary>
        /// 获取文章信息
        /// </summary>
        /// <param name="type">文章属性类型</param>
        /// <param name="classid">指定栏目</param>
        /// <param name="count">显示数量</param>
        /// <returns></returns>
        public IList GetArticle(string type, string mid, string cid, string rid, string iss, string max)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getarticle");
            DataAccess.DataAccess.db.AddInParameter(db, "@type", DbType.String, type);
            DataAccess.DataAccess.db.AddInParameter(db, "@mid", DbType.Int32, int.Parse(mid));
            DataAccess.DataAccess.db.AddInParameter(db, "@cid", DbType.Int32, int.Parse(cid));
            DataAccess.DataAccess.db.AddInParameter(db, "@rid", DbType.Int32, int.Parse(rid));
            DataAccess.DataAccess.db.AddInParameter(db, "@iss", DbType.Int32, int.Parse(iss));
            DataAccess.DataAccess.db.AddInParameter(db, "@max", DbType.Int32, int.Parse(max));

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
        public IList GetChildren(string cid)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getchildren");
            DataAccess.DataAccess.db.AddInParameter(db, "@cid", DbType.Int32, int.Parse(cid));

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
        public IList GetCategory(string type, string cid, string max)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getcategory");
            DataAccess.DataAccess.db.AddInParameter(db, "@type", DbType.String, type);
            DataAccess.DataAccess.db.AddInParameter(db, "@cid", DbType.Int32, int.Parse(cid));
            DataAccess.DataAccess.db.AddInParameter(db, "@max", DbType.Int32, int.Parse(max));

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }

        public IList GetDocCategory(string category)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getdoccategory");
            DataAccess.DataAccess.db.AddInParameter(db, "@category", DbType.Int32, int.Parse(category));

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }

        /// <summary>
        /// 获取上一篇下一篇文章标题
        /// </summary>
        /// <param name="aid"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public IList GetNextOrFront(int aid, string type)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getnextorfront");
            DataAccess.DataAccess.db.AddInParameter(db, "@docid", DbType.Int32, aid);
            DataAccess.DataAccess.db.AddInParameter(db, "@type", DbType.String, type);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
        /// <summary>
        /// 获取文章内容
        /// </summary>
        /// <param name="aid"></param>
        /// <returns></returns>
        public IList GetContent(int docid)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getcontent");
            DataAccess.DataAccess.db.AddInParameter(db, "@docid", DbType.Int32, docid);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
/***********************************文档部分End****************************************/
        /// <summary>
        /// 生成文章需要获取的内容数据
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public IList GetContentView(string where)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Fm_content_view");
            DataAccess.DataAccess.db.AddInParameter(db,"@where",DbType.String,where);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
      
        /// <summary>
        /// 获取网站导航栏目数据
        /// </summary>
        /// <param name="cid"></param>
        /// <returns></returns>
        public IList GetSitemap(int cid)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_sitemap");
            DataAccess.DataAccess.db.AddInParameter(db,"@cid",DbType.Int32,cid);

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
        /// <summary>
        /// 调用友情连接数据
        /// </summary>
        /// <param name="type">友情连接类型</param>
        /// <param name="count">调用的数量</param>
        /// <returns></returns>
        public IList GetLink(string cid, string max)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getlink");
            DataAccess.DataAccess.db.AddInParameter(db, "@cid", DbType.String, cid);

            DataAccess.DataAccess.db.AddInParameter(db, "@max", DbType.Int32, int.Parse(max));


            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }

        public IList GetLinkids(string ids, string max)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getlinkids");
            DataAccess.DataAccess.db.AddInParameter(db, "@ids", DbType.String, ids);

            DataAccess.DataAccess.db.AddInParameter(db, "@max", DbType.Int32, int.Parse(max));


            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }

        public IList GetDocumentAttr(string attrname, int docid)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getdocattr");
            DataAccess.DataAccess.db.AddInParameter(db, "@attrname", DbType.String, attrname);
            DataAccess.DataAccess.db.AddInParameter(db, "@docid", DbType.Int32, docid);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }

        /// <summary>
        /// 调用广告数据
        /// </summary>
        /// <param name="cid">广告类别类型</param>
        /// <param name="max">调用的数量</param>
        /// <returns></returns>
        public IList GetAdvert(string cid, string max)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getadvert");
            DataAccess.DataAccess.db.AddInParameter(db, "@cid", DbType.Int32, int.Parse(cid));

            DataAccess.DataAccess.db.AddInParameter(db, "@max", DbType.Int32, int.Parse(max));


            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }

        public IList GetAlbum(int docid)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getalbum");
            DataAccess.DataAccess.db.AddInParameter(db, "@docid", DbType.Int32, docid);

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
/**************************************栏目调用Start*******************************/
        /// <summary>
        /// 频道信息
        /// </summary>
        /// <param name="cid"></param>
        /// <returns></returns>
        public IList GetChannels(string cid)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_channels");
            DataAccess.DataAccess.db.AddInParameter(db, "@cid", DbType.Int32, int.Parse(cid));
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
        /// <summary>
        /// 获取栏目信息
        /// </summary>
        /// <param name="type">栏目类型</param>
        /// <param name="classid">指定栏目ID</param>
        /// <param name="count">显示数量(0为显示全部)</param>
        /// <returns></returns>
        public IList GetMenu(string max)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getmenu");
            DataAccess.DataAccess.db.AddInParameter(db, "@max", DbType.Int32, int.Parse(max));

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
/***********************************栏目调用End*************************************/
    }
}
