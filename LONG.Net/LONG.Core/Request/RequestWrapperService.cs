/*************************************************************************
 * 文件名称 ：RequestWrapperService.cs                          
 * 描述说明 ：请求包装 服务
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace LONG.Core
{
    public partial class RequestWrapper
    {
        public ServiceBase GetService()
        {
            var module = GetXmlNodeValue("module"); //var area = "";
            return new ServiceBase(module);
        }
    }
}