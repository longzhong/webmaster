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
using System.Text.RegularExpressions;

namespace LONG.Command
{
    public class Command_StringPlus
    {
        /// 
        /// left截取字符串
        /// 
        public static string Left(string sSource, int iLength)
        {
            return sSource.Substring(0, iLength > sSource.Length ? sSource.Length : iLength);
        }
        /// 
        /// Right截取字符串
        /// 
        public static string Right(string sSource, int iLength)
        {
            return sSource.Substring(iLength > sSource.Length ? 0 : sSource.Length - iLength);
        }
        /// 
        /// mid截取字符串
        /// 
        public static string Mid(string sSource, int iStart, int iLength)
        {
            int iStartPoint = iStart > sSource.Length ? sSource.Length : iStart;
            return sSource.Substring(iStartPoint, iStartPoint + iLength > sSource.Length ? sSource.Length - iStartPoint : iLength);
        }

        /// <summary>
        /// 过滤字符串中的html代码
        /// </summary>
        /// <param name="Str"></param>
        /// <returns>返回过滤之后的字符串</returns>
        public static string LostHTML(string Str)
        {
            string Re_Str = "";
            if (Str != null)
            {
                if (Str != string.Empty)
                {
                    string Pattern = "<\\/*[^<>]*>";
                    Re_Str = Regex.Replace(Str, Pattern, "");

                }
            }
            return (Re_Str.Replace("\\r\\n", "")).Replace("\\r", "").Replace("&nbsp;", "");
        }

        /// <summary>
        /// 获得日期的间隔TimeSpan
        /// </summary>
        /// <param name="DateTime1">日期一。</param>
        /// <param name="DateTime2">日期二</param>
        /// <returns>TimeSpan。</returns>
        public static TimeSpan DateDiff(DateTime DateTime_One, DateTime DateTime_Two)
        {
            TimeSpan ts1 = new TimeSpan(DateTime_One.Ticks);
            TimeSpan ts2 = new TimeSpan(DateTime_Two.Ticks);
            TimeSpan ts = ts1.Subtract(ts2).Duration();
            return ts;
        }

        /// <summary>
        /// 从字符串里随机得到，规定个数的字符串.
        /// </summary>
        /// <param name="allChar"></param>
        /// <param name="CodeCount"></param>
        /// <param name="tSleep">是否要在生成前将当前线程阻止以避免重复</param>
        /// <returns></returns>
        public static string RandomCode(string byChar, int CodeCount)
        {
            return RandomCode(byChar, CodeCount, false);
        }

        public static string RandomCode(string byChar, int CodeCount, bool tSleep)
        {
            string randomChar = "";
            switch (byChar)
            {
                case "num":
                    randomChar = "1,2,3,4,5,6,7,8,9";
                    break;
                case "maxen":
                    randomChar = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
                    break;
                case "minien":
                    randomChar = "a,b,c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
                    break;
                case "minien&num":
                    randomChar = "1,2,3,4,5,6,7,8,9,a,b,c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
                    break;
                case "all":
                    randomChar = "1,2,3,4,5,6,7,8,9,a,b,c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,"
                        + "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
                    break;
                case "verificationcode":
                    randomChar = "2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z";
                    break;
                default:
                    randomChar = byChar;
                    break;
            }
            randomChar = randomChar.Replace(",","");

            string RandomCode = "";
            if (tSleep)
            {
                System.Threading.Thread.Sleep(3);
            }
            char[] allCharArray = randomChar.ToCharArray();
            int n = allCharArray.Length;
            System.Random random = new Random(~unchecked((int)DateTime.Now.Ticks));
            for (int i = 0; i < CodeCount; i++)
            {
                int rnd = random.Next(0, n);
                RandomCode += allCharArray[rnd];
            }
            return RandomCode;
        }
    }
}
