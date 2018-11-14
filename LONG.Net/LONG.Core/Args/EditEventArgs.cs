/*************************************************************************
 * 文件名称 ：EditEventArgs.cs                          
 * 描述说明 ：编辑事件参数
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
 **************************************************************************/

using System;
using Newtonsoft.Json.Linq;
using LONG.Data;

namespace LONG.Core
{
    public class EditEventArgs
    {
        public IDbContext db { get; set; }
        public JToken form { get; set; }
        public dynamic formOld { get; set; }
        public JToken row { get; set; }
        public dynamic rowOld { get; set; }
        public JToken list { get; set; }
        public RequestWrapper wrapper { get; set; }
        public OptType type { get; set; }
        public dynamic executeValue { get; set; }

        public EditEventArgs()
        {
            type = OptType.None;
        }
    }
}
