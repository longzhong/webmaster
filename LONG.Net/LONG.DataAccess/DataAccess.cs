using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Data.Common;
using System.Collections;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Configuration;

namespace LONG.DataAccess
{
    /// <summary>
    /// 这是数据访问层 
    /// 用企业库实现增删改操作
    /// </summary>
    public sealed class DataAccess
    {
        DataAccess()
        { }
        //封装成单例模式
        static readonly DataAccess cl =new DataAccess();
        public static DataAccess GetData
        {
            get
            {
                return cl;
            }
        }
        //得到企业库对数据库操作的对象
        public readonly static Database db = DatabaseFactory.CreateDatabase();

        /// <summary>
        /// 返回接口IList的查询方法(企业库)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        
        public IList Select<T>(T t) where T : DbCommand
        {
            return db.ExecuteDataSet(t).Tables[0].DefaultView as IList;
        }

        //返回IDataReader接口的查询方法(企业库)
        public IDataReader ReadSelect<T>(T t) where T : DbCommand
        {
            return db.ExecuteReader(t);
        }
        /// <summary>
        /// 企业库增删改
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public bool Query<T>(T t) where T : DbCommand
        {
            try
            {
               db.ExecuteNonQuery(t);
               return true; 
            }
            catch
            {
                return false;
            }
        }
    }
}
