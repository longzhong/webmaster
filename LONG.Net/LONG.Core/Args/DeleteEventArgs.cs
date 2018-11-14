/*************************************************************************
 * 文件名称 ：DeleteEventArgs.cs                          
 * 描述说明 ：删除事件参数
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
 **************************************************************************/

using LONG.Data;

namespace LONG.Core
{
    public class DeleteEventArgs
    {
        public IDbContext db { get; set; }
        public ParamDeleteData data { get; set; }
        public int executeValue { get; set; }
    }
}
