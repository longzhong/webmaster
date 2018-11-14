using System;
using System.Collections.Generic;
using System.Text;

namespace LONG.Utils.NPOI
{
    [Serializable]
    public class OldFileFormatException : Exception
    {
        public OldFileFormatException(String s)
            : base(s)
        { }

    }
}
