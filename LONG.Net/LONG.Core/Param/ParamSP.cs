/*************************************************************************
 * 文件名称 ：ParamSP.cs                          
 * 描述说明 ：SP参数构建
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
**************************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.ComponentModel;
using LONG.Data;

namespace LONG.Core
{
    public class ParamSP
    {
        protected ParamSPData data;

        public ParamSP Name(string name)
        {
            data.Name = name;
            return this;
        }

        public ParamSP Parameter(string name,object value)
        {
            data.Parameter.Add(name, value);
            return this;
        }

        public ParamSP ParameterOut(string name, DataTypes type)
        {
            data.ParameterOut.Add(name, type);
            return this;
        }
 
        public ParamSP()
        {
            data = new ParamSPData();
        }

        public static ParamSP Instance()
        {
            return new ParamSP();
        }

        public ParamSPData GetData()
        {
            return data;
        }
     }
}
