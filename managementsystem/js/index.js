var index= {
    userName: null,
    userPassword: null,
    login: function () {
        $("#btn-login").click(function (event) {
            userName = $(" #username ").val(),
                userPassword = $(" #password ").val(),
                $.ajax({
                    url:urllist.index_url,
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    data: {
                        "userName": userName,
                        "userPassword": userPassword,
                    },
                    success: function (data) {
                        console.log(data);
                        if (data == 0) {
                            console.log("success");
                            $(location).attr('href', 'project.html'),//should be located:project.html
                            sessionStorage.setItem("userName", userName);
                        }
                        else {
                            alert("请输入正确的用户名与密码！")
                        }
                    }
                })

        })
    }

}