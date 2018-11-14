using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Collections;
using System.IO;

namespace LONG.Bussiness
{
    /// <summary>
    /// 文件流操作类
    /// </summary>
    public class IOStream
    {

        public IOStream()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
        }
        /// <summary>
        /// 单个文件删除
        /// </summary>
        /// <param name="path">文件路径</param>
        /// <returns>返回一个Boolean值,表示文件是否删除成功</returns>
        public Boolean DeleteFile(string path)
        {
            if (File.Exists(path))
            {
                //
                File.Delete(path);

                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 文件夹路径更换
        /// </summary>
        /// <param name="path">原文件夹路径</param>
        /// <param name="file">新文件夹路径</param>
        /// <returns>返回一个Boolean值,表示路径是否更换成功</returns>
        public Boolean FolderMoveTo(string path, string newpath)
        {
            // FileInfo file = new FileInfo();
            DirectoryInfo folder = new DirectoryInfo(path);
            DirectoryInfo newfolder = new DirectoryInfo(newpath);

            if (path != newpath)
            {
                if (!folder.Exists)
                {
                    folder.Create();
                }
                if (!newfolder.Exists)
                {
                    newfolder.Create();
                }
                folder.MoveTo(newpath);
                return true;
            }
            else
            {
                return false;
            }
            // Directory.Move(path,file);

        }
        /// <summary>
        /// 创建文件夹
        /// </summary>
        /// <param name="path">文件夹路径</param>
        /// <returns>返回一个Boolean值,表示文件夹是否创建成功</returns>
        public Boolean CreateFolder(string path)
        {
            DirectoryInfo folder = new DirectoryInfo(path);
            if (!folder.Exists)
            {
                folder.Create();
                return true;
            }
            else
            {
                return false;
            }

        }
        /// <summary>
        /// 删除文件夹
        /// </summary>
        /// <param name="path">文件夹路径</param>
        /// <returns>返回一个Boolean,表示文件夹是否删除成功</returns>
        public Boolean DeleteFolder(string path)
        {
            DirectoryInfo folder = new DirectoryInfo(path);
            if (!folder.Exists)
            {
                folder.Delete(true);
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 读取文件内容
        /// </summary>
        /// <param name="path">文件路径</param>
        /// <returns>返回文件的内容</returns>
        public string ReadFile(string path)
        {
            Encoding code = Encoding.GetEncoding("utf-8");
            StreamReader read = new StreamReader(path, code);
            //  file.OpenText();
            string content = "";
            try
            {
                content = read.ReadToEnd();
                return content;
            }
            catch
            {
                return "";
            }
            finally
            {
                read.Close();
            }

        }
        /// <summary>
        /// 返回StringBuilder类型
        /// </summary>
        /// <param name="path">文件路径</param>
        /// <returns>返回文件的内容</returns>
        public StringBuilder StringBuilderReadFile(string path)
        {
            Encoding code = Encoding.GetEncoding("utf-8");
            StreamReader read = new StreamReader(path, code);

            //  file.OpenText();
            StringBuilder content = new StringBuilder();
            try
            {
                content.Append(read.ReadToEnd());
                return content;
            }
            catch
            {
                return content.Append("");
            }
            finally
            {
                read.Close();
            }

        }
        /// <summary>
        /// 文件写入
        /// </summary>
        /// <param name="path">写入文件的路径</param>
        /// <param name="content">写入文件的内容</param>
        /// <returns>返回一个Boolean值,表示文件是否写入成功</returns>
        public Boolean WriteFile(string path, string content)
        {

            Encoding code = Encoding.GetEncoding("utf-8");//字符编码
            FileInfo file = new FileInfo(path);
            if (file.Exists)
            {
                file.Delete();
            }
            StreamWriter writer = null;
            try
            {
                writer = new StreamWriter(path, false, code);
                writer.Write(content);

                writer.Flush();
                return true;

            }
            catch
            {
                return false;
            }
            finally
            {
                if (writer != null)
                {
                    writer.Close();
                    writer.Dispose();
                }
            }
        }
    }
}
