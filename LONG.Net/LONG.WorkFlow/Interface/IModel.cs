using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using LONG.WorkFlow;
using LONG.WorkFlow;

namespace LONG.WorkFlow
{
    public interface IModel
    {
        int Id { get; set; }
        string CreatePerson { get; set; }
        DateTime? CreateDate { get; set; }
        string UpdatePerson { get; set; }
        DateTime? UpdateDate { get; set; }
    }
}
