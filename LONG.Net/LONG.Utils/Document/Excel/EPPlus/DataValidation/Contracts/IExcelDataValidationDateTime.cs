﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LONG.Utils.EPPlus.DataValidation.Formulas.Contracts;

namespace LONG.Utils.EPPlus.DataValidation.Contracts
{
    /// <summary>
    /// Validation interface for datetime validations
    /// </summary>
    public interface IExcelDataValidationDateTime : IExcelDataValidationWithFormula2<IExcelDataValidationFormulaDateTime>, IExcelDataValidationWithOperator
    {
    }
}
