/*************************************************************************
 * 文件名称 ：ServiceBaseLog.cs                          
 * 描述说明 ：定义数据服务基类中的日志处理
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
 **************************************************************************/

using System;
using log4net;
using Newtonsoft.Json;

namespace LONG.Core
{
    public partial class ServiceBase<T> where T : ModelBase, new()
    {
        protected static ILog Log = LogManager.GetLogger(String.Format("Service{0}", typeof(T).Name));

        protected static void Logger(string function, Action tryHandle, Action<Exception> catchHandle = null, Action finallyHandle = null)
        {
            LogHelper.Logger( Log, function, ErrorHandle.Throw, tryHandle, catchHandle, finallyHandle);
        }

        protected static void Logger(string function, ErrorHandle errorHandleType, Action tryHandle, Action<Exception> catchHandle = null, Action finallyHandle = null)
        {
            LogHelper.Logger( Log, function, errorHandleType, tryHandle, catchHandle, finallyHandle);
        }

        public void Logger(string position,string target,string type,object message) 
        {
            using (var context = Db.Context().UseSharedConnection(true))
            {
                var user = FormsAuth.GetUserData();
                context.Insert("sys_log")
                    .Column("usercode", user.UserCode)
                    .Column("username", user.UserName)
                    .Column("position", position)
                    .Column("target", target)
                    .Column("type", type)
                    .Column("message", JsonConvert.SerializeObject(message))
                    .Column("createdate", DateTime.Now)
                    .Execute();
            }
        }
    }
}
