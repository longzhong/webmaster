using System;

namespace LONG.Data
{
	public partial class DbContext
	{
		public IDbContext IgnoreIfAutoMapFails(bool ignoreIfAutoMapFails)
		{
			Data.IgnoreIfAutoMapFails = true;
			return this;
		}
	}
}
