﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class ApplicationUser : IdentityUser
    {
        //custom column for identity
        [Column(TypeName = "nvarchar(150)")]
        public string FullName  { get; set; }
    }
}
