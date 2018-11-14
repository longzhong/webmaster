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
    /// ��ǩ�������ݶ�ȡ��
    /// </summary>
    public class Tags_sql
    {
/**************************************�ĵ�����Start*******************************************/
        
        /// <summary>
        /// ��ȡ������Ϣ
        /// </summary>
        /// <param name="type">������������</param>
        /// <param name="classid">ָ����Ŀ</param>
        /// <param name="count">��ʾ����</param>
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
        /// ��ȡ��һƪ��һƪ���±���
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
        /// ��ȡ��������
        /// </summary>
        /// <param name="aid"></param>
        /// <returns></returns>
        public IList GetContent(int docid)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getcontent");
            DataAccess.DataAccess.db.AddInParameter(db, "@docid", DbType.Int32, docid);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
/***********************************�ĵ�����End****************************************/
        /// <summary>
        /// ����������Ҫ��ȡ����������
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
        /// ��ȡ��վ������Ŀ����
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
        /// ����������������
        /// </summary>
        /// <param name="type">������������</param>
        /// <param name="count">���õ�����</param>
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
        /// ���ù������
        /// </summary>
        /// <param name="cid">����������</param>
        /// <param name="max">���õ�����</param>
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
/**************************************��Ŀ����Start*******************************/
        /// <summary>
        /// Ƶ����Ϣ
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
        /// ��ȡ��Ŀ��Ϣ
        /// </summary>
        /// <param name="type">��Ŀ����</param>
        /// <param name="classid">ָ����ĿID</param>
        /// <param name="count">��ʾ����(0Ϊ��ʾȫ��)</param>
        /// <returns></returns>
        public IList GetMenu(string max)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Tags_getmenu");
            DataAccess.DataAccess.db.AddInParameter(db, "@max", DbType.Int32, int.Parse(max));

            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
/***********************************��Ŀ����End*************************************/
    }
}
