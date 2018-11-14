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
    /// �ļ���������
    /// </summary>
    public class IOStream
    {

        public IOStream()
        {
            //
            // TODO: �ڴ˴���ӹ��캯���߼�
            //
        }
        /// <summary>
        /// �����ļ�ɾ��
        /// </summary>
        /// <param name="path">�ļ�·��</param>
        /// <returns>����һ��Booleanֵ,��ʾ�ļ��Ƿ�ɾ���ɹ�</returns>
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
        /// �ļ���·������
        /// </summary>
        /// <param name="path">ԭ�ļ���·��</param>
        /// <param name="file">���ļ���·��</param>
        /// <returns>����һ��Booleanֵ,��ʾ·���Ƿ�����ɹ�</returns>
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
        /// �����ļ���
        /// </summary>
        /// <param name="path">�ļ���·��</param>
        /// <returns>����һ��Booleanֵ,��ʾ�ļ����Ƿ񴴽��ɹ�</returns>
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
        /// ɾ���ļ���
        /// </summary>
        /// <param name="path">�ļ���·��</param>
        /// <returns>����һ��Boolean,��ʾ�ļ����Ƿ�ɾ���ɹ�</returns>
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
        /// ��ȡ�ļ�����
        /// </summary>
        /// <param name="path">�ļ�·��</param>
        /// <returns>�����ļ�������</returns>
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
        /// ����StringBuilder����
        /// </summary>
        /// <param name="path">�ļ�·��</param>
        /// <returns>�����ļ�������</returns>
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
        /// �ļ�д��
        /// </summary>
        /// <param name="path">д���ļ���·��</param>
        /// <param name="content">д���ļ�������</param>
        /// <returns>����һ��Booleanֵ,��ʾ�ļ��Ƿ�д��ɹ�</returns>
        public Boolean WriteFile(string path, string content)
        {

            Encoding code = Encoding.GetEncoding("utf-8");//�ַ�����
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
