﻿/*************************************************************************
 * 文件名称 ：ServiceBaseUpdate.cs                          
 * 描述说明 ：定义数据服务基类中的更新处理
 * 
 * 创建信息 : create by 59749706@qq.com 2014-6-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2014 DAX
 **************************************************************************/

namespace LONG.Core
{
    public partial class ServiceBase<T> where T : ModelBase, new()
    {
        protected virtual bool OnBeforeUpdate(UpdateEventArgs arg)
        {
            return true;
        }

        protected virtual void OnAfterUpdate(UpdateEventArgs arg)
        {

        }

        public int Update(ParamUpdate param)
        {
            var result = 0;
            Logger("更新记录", () =>
            {
                db.UseTransaction(true);
                var rtnBefore = this.OnBeforeUpdate(new UpdateEventArgs() { db = db, data = param.GetData() });
                if (!rtnBefore) return;
                result = BuilderParse(param).Execute();
                Msg.Set(MsgType.Success, APP.MSG_UPDATE_SUCCESS);
                this.OnAfterUpdate(new UpdateEventArgs() { db = db, data = param.GetData(), executeValue=result });
                db.Commit();
            });
            return result;
        }
    }
}
