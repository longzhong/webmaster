/*************************************************************************
 * 文件名称 ：ZipCompress.cs                          
 * 描述说明 ：压缩为ZIP
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System.IO;
using LONG.Utils.Ionic.Zip;

namespace LONG.Core
{
    public class ZipCompress: ICompress
    {
        public string Suffix(string orgSuffix)
        {
            return "zip";
        }

        public Stream Compress(Stream fileStream,string fullName)
        {
            using (var zip = new ZipFile())
            {
                zip.AddEntry(fullName, fileStream);
                Stream zipStream = new MemoryStream();
                zip.Save(zipStream);
                return zipStream;
            }
        }
    }
}
