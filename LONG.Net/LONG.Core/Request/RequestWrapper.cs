﻿/*************************************************************************
 * 文件名称 ：RequestWrapper.cs                          
 * 描述说明 ：请求包装
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System.Collections.Generic;
using System.Collections.Specialized;
using System.Web;

namespace LONG.Core
{
    public partial class RequestWrapper
    {
        private List<string> ignores = new List<string> { null, "page", "rows", "sort", "order", "format", "FLUENTDATA_ROWNUMBER" };
        private string ignoreStartWith = "_";
        private NameValueCollection request { get; set; }

        private string settingXml = "<settings></settings>";

        public bool IsLoadedSettings { get { return !string.IsNullOrEmpty(settingXml); } }
 
        public string this[string name]
        {
            get 
            {
                var field = string.Empty;
                if (name.IndexOf(".") >= 0) field = name.Split('.')[1];
                return request[field] ?? request[getAliasName(name)]; 
            }
            set {
                if (name.IndexOf(".") >= 0) name = name.Split('.')[1];
                request[name] = value;
            }
        }

        #region 构造函数
        public RequestWrapper(NameValueCollection query)
        {
            this.SetRequestData(query);
        }

        public RequestWrapper()
        {
            this.SetRequestData(new NameValueCollection());
        }

        public static RequestWrapper Instance()
        {
            return new RequestWrapper();
        }

        public static RequestWrapper InstanceFromRequest()
        {
            var request = new NameValueCollection(HttpContext.Current.Request.QueryString);
            return new RequestWrapper(request);
        }
        #endregion
    }
}