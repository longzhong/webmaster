/*************************************************************************
 * 文件名称 ：ParamDeleteData.cs                          
 * 描述说明 ：接入参数数据
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System.Collections.Generic;

namespace LONG.Core
{
    public class ParamInsertData
    {
        public string From { get; set; }
        public Dictionary<string,object> Columns { get; set; }

        public ParamInsertData()
        {
            From = "";
            Columns = new Dictionary<string, object>();
        }
    }
}
