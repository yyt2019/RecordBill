﻿using System.ComponentModel.DataAnnotations;

namespace RecordBill.PresentationModel.User.Request
{
    /// <summary>
    /// 用户登录请求模型
    /// </summary>
    public class UserLoginRequestModel
    {
        /// <summary>
        /// 账号
        /// </summary>
        [Required(ErrorMessage = "账号不可以为空"), StringLength(50, ErrorMessage = "账号长度不能超过50")]
        public string Account { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        [Required(ErrorMessage = "密码不可以为空")]
        public string Password { get; set; }
    }
}
