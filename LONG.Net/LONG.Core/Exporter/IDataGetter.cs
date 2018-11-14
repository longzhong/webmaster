/*************************************************************************
 * 文件名称 ：IDataGetter.cs                          
 * 描述说明 ：取得数据接口
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System.Web;

namespace LONG.Core
{
    public interface IDataGetter
    {
        object GetData(HttpContext context);
    }
}
