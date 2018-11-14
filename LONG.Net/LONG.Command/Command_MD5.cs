/*******************************************************************************
 * LONGCMS - 网站内容管理系统
 * Copyright (C) 2014
 * 
 * @author longzhong <59749706@qq.com>
 * @version (2014-10-8)
*******************************************************************************/
using System;
using System.Collections.Generic;
using System.Text;

namespace LONG.Command
{
    public class Command_MD5
    {
        public static string md5(string str)
        {
            System.Security.Cryptography.MD5 md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(str);
            bytes = md5.ComputeHash(bytes);
            md5.Clear();

            string ret = "";
            for (int i = 0; i < bytes.Length; i++)
            {
                ret += Convert.ToString(bytes[i], 16).PadLeft(2, '0');
            }

            return ret.PadLeft(32, '0');
        }

    }
}
