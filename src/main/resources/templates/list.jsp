<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<table align='center' border='1' cellspacing='0'>
    <tr>
        <td>id</td>
        <td>pw</td>
        <td>name</td>
        <td>tel</td>
        <td>mail</td>
    </tr>

        <tr>
            <td>${cs.userID}</td>
            <td>${cs.userPw}</td>
            <td>${cs.userName}</td>
            <td>${cs.userTel}</td>
            <td>${cs.userMail}</td>

        </tr>
</table>