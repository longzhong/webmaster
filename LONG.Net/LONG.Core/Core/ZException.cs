/*************************************************************************
 * 文件名称 ：ZException.cs                          
 * 描述说明 ：框架错误定义
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
 **************************************************************************/

using System;

namespace LONG.Core
{
	public class ZException : Exception
	{
		public ZException(string message): base(message){}
        public ZException(string message, Exception innerException) : base(message, innerException) { }
	}
}
