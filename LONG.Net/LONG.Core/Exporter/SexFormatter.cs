/*************************************************************************
 * 文件名称 ：SexFormatter.cs                          
 * 描述说明 ：格式化示例
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System;

namespace LONG.Core
{
    public class SexFormatter:IFormatter
    {
        public object Format(object value)
        {
            switch(Convert.ToString(value))
            {
                case "0":
                    return "纯爷们";
                case "1":
                    return "女汉子";
                default:
                    return "春哥";
            }
        }
    }
}
