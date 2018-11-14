using System;

namespace LONG.WorkFlow
{
    public class TaskEventArgs : EventArgs
    {
        public TaskInstance taskInstance;
        //public DataAccess da;

        public TaskEventArgs(TaskInstance taskInstance)
        {
            //this.taskInstance = taskInstance;
            //this.da = taskInstance.GetProcessInstance().GetContextInstance().da;
        }
    }
}
