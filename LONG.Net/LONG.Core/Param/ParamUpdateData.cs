/*************************************************************************
 * 文件名称 ：ParamUpdateData.cs                          
 * 描述说明 ：更新参数数据
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LONG.Core
{
    public class ParamUpdateData
    {
        public string Update { get; set; }
        public Dictionary<string,object> Columns { get; set; }
        public List<ParamWhere> Where { get; set; }
        public string WhereSql { get { return ParamUtils.GetWhereSql(Where); } }

        public ParamUpdateData()
        {
            Update = "";
            Columns = new Dictionary<string, object>();
            Where = new List<ParamWhere>();
        }
    }
}
