/*******************************************************************************
 * LONGCMS - 网站内容管理系统
 * Copyright (C) 2014
 * 
 * @author longzhong <59749706@qq.com>
 * @version (2014-10-8)
*******************************************************************************/
using System;
using System.Configuration;

namespace LONG.Command
{
    public class Command_Configuration
    {
        static string strXmlFile = System.Web.HttpContext.Current.Server.MapPath("~/config/sys.config");

        /// <summary>
        /// string
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetConfigString(string byKey)
        {
            string rInfo = LONG.Helper.XMLHelper.GetXmlNodeByXpath(strXmlFile, "//sys_configuration//" + byKey).InnerText.Trim();
            return rInfo;
        }

        /// <summary>
        /// string
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetVersionsString(string byKey)
        {
            string rInfo = LONG.Helper.XMLHelper.GetXmlNodeByXpath(strXmlFile, "//sys_versions//" + byKey).InnerText.Trim();
            return rInfo;
        }

        /// <summary>
        /// Bool
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool GetConfigBool(string byKey)
        {
            bool result = false;
            string cfgVal = LONG.Helper.XMLHelper.GetXmlNodeByXpath(strXmlFile, "//sys_configuration//" + byKey).InnerText.Trim();
            if (null != cfgVal && string.Empty != cfgVal)
            {
                try
                {
                    result = bool.Parse(cfgVal);
                }
                catch (FormatException)
                {

                }
            }
            return result;
        }
        /// <summary>
        /// Decimal
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static decimal GetConfigDecimal(string byKey)
        {
            decimal result = 0;
            string cfgVal = LONG.Helper.XMLHelper.GetXmlNodeByXpath(strXmlFile, "//sys_configuration//" + byKey).InnerText.Trim();
            if (null != cfgVal && string.Empty != cfgVal)
            {
                try
                {
                    result = decimal.Parse(cfgVal);
                }
                catch (FormatException)
                {

                }
            }

            return result;
        }
        /// <summary>
        /// int
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static int GetConfigInt(string byKey)
        {
            int result = 0;
            string cfgVal = LONG.Helper.XMLHelper.GetXmlNodeByXpath(strXmlFile, "//sys_configuration//" + byKey).InnerText.Trim();
            if (null != cfgVal && string.Empty != cfgVal)
            {
                try
                {
                    result = int.Parse(cfgVal);
                }
                catch (FormatException)
                {

                }
            }

            return result;
        }
    }
}