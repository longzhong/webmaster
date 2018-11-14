using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LONG.WorkFlow
{
    public enum TaskState
    {
        //工作项状态

        //停止
        Stop,

        //挂起
        Pending,

        //运行
        Run,

        //完成
        Complete,

        //终止
        Termination,

        //删除
        Delete

    }
}
