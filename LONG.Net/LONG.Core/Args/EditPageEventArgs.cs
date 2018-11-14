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
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using LONG.Data;

namespace LONG.Core
{
    public class EditPageEventArgs
    {
        //execute
        public IDbContext db { get; set; }
        public int executeValue { get; set; }

        //arg
        public JObject data { get; set; }
        public RequestWrapper formWrapper { get; set; }
        public List<RequestWrapper> tabsWrapper { get; set; }
 
        //form
        public JToken dataNew { get; set; }
        public dynamic dataOld { get; set; }
        public RequestWrapper dataWrapper { get; set; }
        public OptType dataAction { get; set; }

        //rows
        public int tabIndex { get; set; }
        public TabType tabType { get; set; }
        public JToken tabData { get; set; }

        public EditPageEventArgs()
        {
            dataAction = OptType.None;
        }
    }
}
