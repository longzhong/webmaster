using System;

namespace LONG.Data
{
	public interface IEntityFactory
	{
		object Create(Type type);
	}
}
