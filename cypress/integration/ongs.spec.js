/// <reference types="cypress" />

import Logon from '../support/pages/Logon'
import Register from '../support/pages/Register'
import Profile from '../support/pages/Profile'
import NewIncident from '../support/pages/NewIncident'

describe('Ongs', () => {
    it('Deve poder realizar um cadastro', () => {
        Register.acessarCadastro()
        Register.preencherCadastro()
        Register.validarCadastroDeOngComSucesso()
    });

    it('Deve poder realizar o login no sistema', () => {   
        Logon.acessarLogin()
        Logon.preencherLogin()
    });

    it('Deve poder fazer logout', () => {
        cy.login()
        Profile.clicarNoBotaoLogout()
    });

    it('Deve poder cadastrar novos casos', () => {
        cy.login()

        Profile.clicarNoBotaoCadastrarNovosCasos()

        NewIncident.preencherCadastroDeCaso()
        NewIncident.validarCadastroDeCaso()
    });

    it('Deve poder exluir um caso', () => {
        cy.createNewIncident()
        cy.login()

        Profile.clicarNoBotaoExlcuirUmCaso()
        Profile.validarExclusaoDeCasoComSucesso()
    });
});