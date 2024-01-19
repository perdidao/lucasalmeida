@code
    Dim mADM As New svcADM
    If Not mADM.EstouLogado Then
        Response.Redirect("/adm/login.vbhtml")
    End If
End Code

<nav id="menu">
    @If ADM.ADMFactory.NivelPermitido(2) Then
    @<a href = "/adm/banners.vbhtml" title="">Banners</a>
    End If

    <a href = "javascript:;" title="" id="btn-menu"></a>

    <div Class="hidden-menu">
        @If ADM.ADMFactory.NivelPermitido(1) Then
        @<a href = "/adm/usuarios.vbhtml" title="">Usuários</a>
        end if
    </div>
</nav>