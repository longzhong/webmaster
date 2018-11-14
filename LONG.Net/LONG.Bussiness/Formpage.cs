using System;
using System.Collections.Generic;
using System.Text;
using LONG.DataAccess;
using System.Data;
using System.Data.Common;
using System.Collections;

namespace LONG.Bussiness
{
    public class Formpage
    {
        public Formpage()
        {
            //
            // TODO: �ڴ˴���ӹ��캯���߼�
            //
        }
        /// <summary>
        /// �������ķ�ҳ��ѯ(�Զ����������͵�:0����;1 ����)
        /// </summary>
        /// <param name="tablename"></param>
        /// <param name="colname"></param>
        /// <returns></returns>
        public IList PageView_ByOrder(string tablename, string colname, int pagesize, int pageindex, string where,int order)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Fm_GetRecordFromPage");
            DataAccess.DataAccess.db.AddInParameter(db, "@tblName", DbType.String, tablename);
            DataAccess.DataAccess.db.AddInParameter(db, "@fldName", DbType.String, colname);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageSize", DbType.Int32, pagesize);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageIndex", DbType.Int32, pageindex);
            DataAccess.DataAccess.db.AddInParameter(db, "@OrderType", DbType.Boolean, order);
            DataAccess.DataAccess.db.AddInParameter(db, "@strWhere", DbType.String, where);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
        /// <summary>
        /// �������ķ�ҳ��ѯ
        /// </summary>
        /// <param name="tablename"></param>
        /// <param name="colname"></param>
        /// <returns></returns>
        public IList PageView_Bywhere(string tablename, string colname, int pagesize, int pageindex, string where)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Fm_GetRecordFromPage");
            DataAccess.DataAccess.db.AddInParameter(db, "@tblName", DbType.String, tablename);
            DataAccess.DataAccess.db.AddInParameter(db, "@fldName", DbType.String, colname);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageSize", DbType.Int32, pagesize);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageIndex", DbType.Int32, pageindex);
            DataAccess.DataAccess.db.AddInParameter(db, "@OrderType", DbType.Boolean, 1);
            DataAccess.DataAccess.db.AddInParameter(db, "@strWhere", DbType.String, where);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }

        /// <summary>
        /// ��ѯ���ݵ��ܼ�¼��
        /// </summary>
        /// <param name="tablename"></param>
        /// <param name="colname"></param>
        /// <returns></returns>
        public IList PageRow(string tablename, string colname, int pagesize, int pageindex, string where)
        {

            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Fm_GetRecordFromPage");
            DataAccess.DataAccess.db.AddInParameter(db, "@tblName", DbType.String, tablename);
            DataAccess.DataAccess.db.AddInParameter(db, "@fldName", DbType.String, colname);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageSize", DbType.Int32, pagesize);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageIndex", DbType.Int32, pageindex);
            DataAccess.DataAccess.db.AddInParameter(db, "@strWhere", DbType.String, where);
            DataAccess.DataAccess.db.AddInParameter(db, "@IsCount", DbType.Boolean, 1);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
        /// <summary>
        /// ���������ķ�ҳ��ѯ
        /// 
        /// </summary>
        /// <param name="tablename"></param>
        /// <param name="colname"></param>
        /// <param name="pagesize"></param>
        /// <param name="pageindex"></param>
        /// <returns></returns>
        public IList PageView(string tablename, string colname, int pagesize, int pageindex)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Fm_GetRecordFromPage");
            DataAccess.DataAccess.db.AddInParameter(db, "@tblName", DbType.String, tablename);
            DataAccess.DataAccess.db.AddInParameter(db, "@fldName", DbType.String, colname);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageSize", DbType.Int32, pagesize);
            DataAccess.DataAccess.db.AddInParameter(db, "@PageIndex", DbType.Int32, pageindex);
            DataAccess.DataAccess.db.AddInParameter(db, "@OrderType", DbType.Boolean, 1);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db);
        }
    }
}
