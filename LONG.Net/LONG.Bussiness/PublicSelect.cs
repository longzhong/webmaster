using System;
using System.Collections.Generic;
using System.Text;
using LONG.DataAccess;
using System.Data;
using System.Data.Common;
using System.Collections;
namespace LONG.Bussiness
{
    public class PublicSelect
    {
        /// <summary>
        /// SQL����ѯ����
        /// </summary>
        /// <param name="sqlstr"></param>
        /// <returns></returns>
        public DataView Selectps(string sqlstr)
        {
            DbCommand db = DataAccess.DataAccess.db.GetSqlStringCommand(sqlstr);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db) as DataView;
        }
        /// <summary>
        /// ���ò�ѯ��
        /// </summary>
        /// <param name="sqlstr">�ӣѣ����</param>
        /// <returns></returns>
        public DataView Getps(string tablename,string field,string where)
        {
            DbCommand db = DataAccess.DataAccess.db.GetStoredProcCommand("Fm_proc_PubSelect");
            DataAccess.DataAccess.db.AddInParameter(db,"@tablename",DbType.String,tablename);
            DataAccess.DataAccess.db.AddInParameter(db,"@field",DbType.String,field);
            DataAccess.DataAccess.db.AddInParameter(db,"@where",DbType.String,where);
            return DataAccess.DataAccess.GetData.Select<DbCommand>(db) as DataView;
        }
        /// <summary>
        /// ������ɾ����
        /// </summary>
        /// <param name="sqlstr">sql���</param>
        /// <returns></returns>
        public bool Queryps(string sqlstr)
        {
            DbCommand db = DataAccess.DataAccess.db.GetSqlStringCommand(sqlstr);
            return DataAccess.DataAccess.GetData.Query<DbCommand>(db);
        }
    }
}
