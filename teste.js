const resposta = [
    {
      "modulo": "formulacao",
      "recursos": [
            {
            "recurso": "Configurações",
            "permissoes": [
                {
                "id": 5,
                "codigo": "config:deletar",
                "modulo": "formulacao",
                "recurso": "Configurações",
                "metodo": "DELETE",
                "rota_template": "/formulacao/configuracao/:key",
                "descricao": "Deletar configuração por KEY",
                "eh_publica": false
                },
                {
                "id": 2,
                "codigo": "config:consultar",
                "modulo": "formulacao",
                "recurso": "Configurações",
                "metodo": "GET",
                "rota_template": "/formulacao/configuracao",
                "descricao": "Listar configurações",
                "eh_publica": false
                },
                {
                "id": 3,
                "codigo": "config:consultarPorId",
                "modulo": "formulacao",
                "recurso": "Configurações",
                "metodo": "GET",
                "rota_template": "/formulacao/configuracao/:key",
                "descricao": "Obter configuração por KEY",
                "eh_publica": false
                },
                {
                "id": 1,
                "codigo": "config:cadastrar",
                "modulo": "formulacao",
                "recurso": "Configurações",
                "metodo": "POST",
                "rota_template": "/formulacao/configuracao",
                "descricao": "Cadastrar configuração",
                "eh_publica": false
                },
                {
                "id": 4,
                "codigo": "config:alterar",
                "modulo": "formulacao",
                "recurso": "Configurações",
                "metodo": "PUT",
                "rota_template": "/formulacao/configuracao/:key",
                "descricao": "Alterar configuração por KEY",
                "eh_publica": false
                }
            ]
            },
            {
            "recurso": "Elementos",
            "permissoes": [
                {
                "id": 6,
                "codigo": "elemento:consultar",
                "modulo": "formulacao",
                "recurso": "Elementos",
                "metodo": "GET",
                "rota_template": "/formulacao/elemento",
                "descricao": "Exibir dados dos elementos cadastrados",
                "eh_publica": true
                },
                {
                "id": 7,
                "codigo": "elemento:consultarPorId",
                "modulo": "formulacao",
                "recurso": "Elementos",
                "metodo": "GET",
                "rota_template": "/formulacao/elemento/:id",
                "descricao": "Exibir dados dos elementos pelo ID",
                "eh_publica": true
                },
                {
                "id": 8,
                "codigo": "elemento:consultarPorSimbolo",
                "modulo": "formulacao",
                "recurso": "Elementos",
                "metodo": "GET",
                "rota_template": "/formulacao/elemento/simbolo/:simbolo",
                "descricao": "Exibir dados dos elementos pelo símbolo",
                "eh_publica": true
                }
            ]
            },
            {
            "recurso": "Garantias",
            "permissoes": [
                {
                "id": 25,
                "codigo": "garantia:deletar",
                "modulo": "formulacao",
                "recurso": "Garantias",
                "metodo": "DELETE",
                "rota_template": "/formulacao/garantia/:id",
                "descricao": "Remover garantia de nutriente para uma matéria-prima",
                "eh_publica": false
                },
                {
                "id": 22,
                "codigo": "garantia:consultarPorMateria_prima",
                "modulo": "formulacao",
                "recurso": "Garantias",
                "metodo": "GET",
                "rota_template": "/formulacao/garantia/materia_prima/:materia_primaId",
                "descricao": "Listar as garantias de nutrientes de uma determinada matéria-prima",
                "eh_publica": false
                },
                {
                "id": 21,
                "codigo": "garantia:consultarPorNutriente",
                "modulo": "formulacao",
                "recurso": "Garantias",
                "metodo": "GET",
                "rota_template": "/formulacao/garantia/nutriente/:nutrienteId",
                "descricao": "Listar as materiais-primas que possuem de um determinado nutriente",
                "eh_publica": false
                },
                {
                "id": 23,
                "codigo": "garantia:cadastrar",
                "modulo": "formulacao",
                "recurso": "Garantias",
                "metodo": "POST",
                "rota_template": "/formulacao/garantia",
                "descricao": "Cadastrar uma nova garantia de nutriente para uma matéria-prima",
                "eh_publica": false
                },
                {
                "id": 24,
                "codigo": "garantia:alterar",
                "modulo": "formulacao",
                "recurso": "Garantias",
                "metodo": "PUT",
                "rota_template": "/formulacao/garantia/:id",
                "descricao": "Atualizar uma garantia de nutriente para uma matéria-prima",
                "eh_publica": false
                }
            ]
            },
            {
            "recurso": "Matérias-primas",
            "permissoes": [
                {
                "id": 29,
                "codigo": "materia_prima:deletar",
                "modulo": "formulacao",
                "recurso": "Matérias-primas",
                "metodo": "DELETE",
                "rota_template": "/formulacao/materia_prima/:id",
                "descricao": "Remover matéria-prima",
                "eh_publica": false
                },
                {
                "id": 26,
                "codigo": "materia_prima:consultar",
                "modulo": "formulacao",
                "recurso": "Matérias-primas",
                "metodo": "GET",
                "rota_template": "/formulacao/materia_prima",
                "descricao": "Listar matérias-primas cadastradas",
                "eh_publica": false
                },
                {
                "id": 27,
                "codigo": "materia_prima:consultarPorId",
                "modulo": "formulacao",
                "recurso": "Matérias-primas",
                "metodo": "GET",
                "rota_template": "/formulacao/materia_prima/:id",
                "descricao": "Visualizar dados detalhados de uma matéria-prima",
                "eh_publica": false
                },
                {
                "id": 28,
                "codigo": "materia_prima:consultarMP_percentual_nutriente",
                "modulo": "formulacao",
                "recurso": "Matérias-primas",
                "metodo": "GET",
                "rota_template": "/formulacao/materia_prima/compor_projeto/:nutriente/:percentual",
                "descricao": "Listar matérias-primas que possuam um percentual de um nutriente desejado",
                "eh_publica": false
                },
                {
                "id": 30,
                "codigo": "materia_prima:cadastrar",
                "modulo": "formulacao",
                "recurso": "Matérias-primas",
                "metodo": "POST",
                "rota_template": "/formulacao/materia_prima",
                "descricao": "Cadastrar matéria-prima",
                "eh_publica": false
                },
                {
                "id": 31,
                "codigo": "materia_prima:alterar",
                "modulo": "formulacao",
                "recurso": "Matérias-primas",
                "metodo": "PUT",
                "rota_template": "/formulacao/materia_prima/:id",
                "descricao": "Alterar os dados de uma matéria-prima",
                "eh_publica": false
                }
            ]
            },
            {
            "recurso": "Nutrientes",
            "permissoes": [
                {
                "id": 34,
                "codigo": "nutriente:deletar",
                "modulo": "formulacao",
                "recurso": "Nutrientes",
                "metodo": "DELETE",
                "rota_template": "/formulacao/nutriente/:id",
                "descricao": "Remover nutriente",
                "eh_publica": false
                },
                {
                "id": 32,
                "codigo": "nutriente:consultar",
                "modulo": "formulacao",
                "recurso": "Nutrientes",
                "metodo": "GET",
                "rota_template": "/formulacao/nutriente",
                "descricao": "Listar nutrientes cadastrados",
                "eh_publica": false
                },
                {
                "id": 33,
                "codigo": "nutriente:consultarPorId",
                "modulo": "formulacao",
                "recurso": "Nutrientes",
                "metodo": "GET",
                "rota_template": "/formulacao/nutriente/:id",
                "descricao": "Visualizar dados detalhados de um nutriente",
                "eh_publica": false
                },
                {
                "id": 35,
                "codigo": "nutriente:cadastrar",
                "modulo": "formulacao",
                "recurso": "Nutrientes",
                "metodo": "POST",
                "rota_template": "/formulacao/nutriente",
                "descricao": "Cadastrar nutriente",
                "eh_publica": false
                },
                {
                "id": 36,
                "codigo": "nutriente:alterar",
                "modulo": "formulacao",
                "recurso": "Nutrientes",
                "metodo": "PUT",
                "rota_template": "/formulacao/nutriente/:id",
                "descricao": "Alterar dados de um nutriente",
                "eh_publica": false
                }
            ]
            },
            {
            "recurso": "Projetos",
            "permissoes": [
                {
                "id": 14,
                "codigo": "etapa_mp:deletar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "DELETE",
                "rota_template": "/formulacao/etapa_mp/:id",
                "descricao": "Remover matérias-primas de uma etapa",
                "eh_publica": false
                },
                {
                "id": 20,
                "codigo": "etapa:deletar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "DELETE",
                "rota_template": "/formulacao/etapa/:id",
                "descricao": "Remover etapas de um projeto",
                "eh_publica": false
                },
                {
                "id": 46,
                "codigo": "projeto:deletar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "DELETE",
                "rota_template": "/formulacao/projeto/:id",
                "descricao": "Deletar projeto",
                "eh_publica": false
                },
                {
                "id": 10,
                "codigo": "etapa_mp:consultarPorId",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/etapa_mp/:id",
                "descricao": "Visualizar uma matéria-prima especifica presente na etapa",
                "eh_publica": false
                },
                {
                "id": 11,
                "codigo": "etapa_mp:consultarPorEtapa",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/etapa_mp/etapa/:id",
                "descricao": "Visualizar as matérias-primas de uma etapa",
                "eh_publica": false
                },
                {
                "id": 16,
                "codigo": "etapa:consultarPorId",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/etapa/:id",
                "descricao": "Visualizar detalhes das etapas de um projeto",
                "eh_publica": false
                },
                {
                "id": 17,
                "codigo": "etapa:consultarPorProjeto",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/etapa/projeto_id/:id",
                "descricao": "Listar as etapas de um projeto",
                "eh_publica": false
                },
                {
                "id": 37,
                "codigo": "projeto:consultar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/projeto",
                "descricao": "Visualizar todos os projetos",
                "eh_publica": false
                },
                {
                "id": 38,
                "codigo": "projeto:consultarPorId",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/projeto/:id",
                "descricao": "Consultar um projeto pelo seu ID",
                "eh_publica": false
                },
                {
                "id": 39,
                "codigo": "projeto:consultarPorCodigo",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/projeto/codigo/:codigo",
                "descricao": "Consultar um projeto pelo seu código",
                "eh_publica": false
                },
                {
                "id": 41,
                "codigo": "projeto:consultarPorData",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/projeto/data/:inicio/:termino",
                "descricao": "Listar projetos por período",
                "eh_publica": false
                },
                {
                "id": 40,
                "codigo": "projeto:consultarDetalhado",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "GET",
                "rota_template": "/formulacao/projeto/detalhado/:id",
                "descricao": "Visualizar a formulação detalhada de um projeto",
                "eh_publica": false
                },
                {
                "id": 15,
                "codigo": "etapa:cadastrar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "POST",
                "rota_template": "/formulacao/etapa",
                "descricao": "Cadastrar etapas para um projeto",
                "eh_publica": false
                },
                {
                "id": 9,
                "codigo": "etapa_mp:cadastrar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "POST",
                "rota_template": "/formulacao/etapa_mp",
                "descricao": "Adicionar matéria-prima à etapa",
                "eh_publica": false
                },
                {
                "id": 42,
                "codigo": "projeto:cadastrar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "POST",
                "rota_template": "/formulacao/projeto",
                "descricao": "Cadastrar projeto",
                "eh_publica": false
                },
                {
                "id": 43,
                "codigo": "projeto:duplicar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "POST",
                "rota_template": "/formulacao/projeto/:id",
                "descricao": "Duplicar projeto",
                "eh_publica": false
                },
                {
                "id": 12,
                "codigo": "etapa_mp:alterar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "PUT",
                "rota_template": "/formulacao/etapa_mp/:id",
                "descricao": "Alterar dados de uma matéria-prima presente em uma etapa",
                "eh_publica": false
                },
                {
                "id": 13,
                "codigo": "etapa_mp:alterarOrdem",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "PUT",
                "rota_template": "/formulacao/etapa_mp/ordenar/m_p/",
                "descricao": "Alterar a ordem das matérias-primas presentes na etapa",
                "eh_publica": false
                },
                {
                "id": 18,
                "codigo": "etapa:alterar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "PUT",
                "rota_template": "/formulacao/etapa/:id",
                "descricao": "Alterar dados das etapas de um projeto",
                "eh_publica": false
                },
                {
                "id": 19,
                "codigo": "etapa:alterarOrdem",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "PUT",
                "rota_template": "/formulacao/etapa/projeto/ordenar/",
                "descricao": "Reordenar as etapas de um projeto",
                "eh_publica": false
                },
                {
                "id": 44,
                "codigo": "projeto:alterar",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "PUT",
                "rota_template": "/formulacao/projeto/:id",
                "descricao": "Alterar projeto",
                "eh_publica": false
                },
                {
                "id": 45,
                "codigo": "projeto:addResultado",
                "modulo": "formulacao",
                "recurso": "Projetos",
                "metodo": "PUT",
                "rota_template": "/formulacao/projeto/:id/resultado",
                "descricao": "Cadastrar resultados (Acompanhamento)",
                "eh_publica": false
                }
            ]
            }
        ]
    },
    {
      "modulo": "rbac",
      "recursos": [
        {
          "recurso": "Controle de Acesso",
          "permissoes": [
            {
              "id": 54,
              "codigo": "perfis:remover",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "DELETE",
              "rota_template": "/rbac/perfis/:id",
              "descricao": "Remover perfis",
              "eh_publica": false
            },
            {
              "id": 72,
              "codigo": "usuario_perfis:desvincular",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "DELETE",
              "rota_template": "/rbac/usuario_perfis/:vinculoID",
              "descricao": "Desvincular usuario de perfis",
              "eh_publica": false
            },
            {
              "id": 56,
              "codigo": "perfis_permissoes:listarVinculos",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/perfil_permissoes/:perfilId/",
              "descricao": "Listar as permissões vinculadas aos perfis",
              "eh_publica": false
            },
            {
              "id": 57,
              "codigo": "perfis_permissoes:permissoesPerfilAcessos",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/perfil_permissoes/acessos/:perfilId",
              "descricao": "Controla os acessos do perfil por meio das permissões vinculadas",
              "eh_publica": true
            },
            {
              "id": 49,
              "codigo": "perfis:listar",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/perfis",
              "descricao": "Listar perfis cadastrados",
              "eh_publica": false
            },
            {
              "id": 50,
              "codigo": "perfis:consultarPorId",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/perfis/:id",
              "descricao": "Visualizar detalhes dos perfis",
              "eh_publica": false
            },
            {
              "id": 51,
              "codigo": "perfis:consultarPorNome",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/perfis/nome/:nome",
              "descricao": "Consultar/Filtrar perfis por nome",
              "eh_publica": false
            },
            {
              "id": 58,
              "codigo": "permissoes:listar",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/permissoes",
              "descricao": "Listar permissões do sistema",
              "eh_publica": false
            },
            {
              "id": 60,
              "codigo": "permissoes:listarDisponiveisParaVinculacao",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/permissoes/disponiveis_vinculacao",
              "descricao": "Listar permissões disponíveis para vinculação",
              "eh_publica": true
            },
            {
              "id": 59,
              "codigo": "permissoes:listarDoUsuarioLogado",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/permissoes/usuario",
              "descricao": "Listar permissões do usuário logado",
              "eh_publica": true
            },
            {
              "id": 61,
              "codigo": "permissoes:listarPorUsuario",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/permissoes/usuario/:usuarioId",
              "descricao": "Listar permissões por usuário",
              "eh_publica": false
            },
            {
              "id": 73,
              "codigo": "usuario_perfis:listar",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/usuario_perfis",
              "descricao": "Listar os vínculos entre usuários e perfis",
              "eh_publica": false
            },
            {
              "id": 76,
              "codigo": "usuario_perfis:listarUsuariosPorPerfil",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/usuario_perfis/perfil/:perfilId/usuarios",
              "descricao": "Listar usuários vinculados a um perfil",
              "eh_publica": false
            },
            {
              "id": 75,
              "codigo": "usuario_perfis:listarPerfisPorUsuario",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/usuario_perfis/usuario/:usuarioId/perfis",
              "descricao": "Listar perfis vinculados a um usuário",
              "eh_publica": false
            },
            {
              "id": 74,
              "codigo": "usuario_perfis:listarDoUsuarioLogado",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "GET",
              "rota_template": "/rbac/usuario_perfis/usuario/perfis",
              "descricao": "Listar os perfis vinculados a um usuário logado",
              "eh_publica": true
            },
            {
              "id": 55,
              "codigo": "perfis_permissoes:vincular",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "POST",
              "rota_template": "/rbac/perfil_permissoes",
              "descricao": "Atribuir permissões aos perfis",
              "eh_publica": false
            },
            {
              "id": 52,
              "codigo": "perfis:cadastrar",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "POST",
              "rota_template": "/rbac/perfis",
              "descricao": "Cadastrar novo perfil",
              "eh_publica": false
            },
            {
              "id": 71,
              "codigo": "usuario_perfis:vincular",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "POST",
              "rota_template": "/rbac/usuario_perfis",
              "descricao": "Vincular usuario a perfis",
              "eh_publica": false
            },
            {
              "id": 53,
              "codigo": "perfis:alterar",
              "modulo": "rbac",
              "recurso": "Controle de Acesso",
              "metodo": "PUT",
              "rota_template": "/rbac/perfis/:id",
              "descricao": "Alterar informações dos perfis",
              "eh_publica": false
            }
          ]
        },
        {
          "recurso": "Info",
          "permissoes": [
            {
              "id": 47,
              "codigo": "endpoints:listar",
              "modulo": "rbac",
              "recurso": "Info",
              "metodo": "GET",
              "rota_template": "/rbac/endpoints",
              "descricao": "Obtém a lista de endpoints da API.",
              "eh_publica": true
            }
          ]
        },
        {
          "recurso": "Usuários",
          "permissoes": [
            {
              "id": 68,
              "codigo": "usuario:deletar",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "DELETE",
              "rota_template": "/rbac/usuario/:id",
              "descricao": "Remover usuários do sistema",
              "eh_publica": false
            },
            {
              "id": 67,
              "codigo": "usuario:deletarPerfilLogado",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "DELETE",
              "rota_template": "/rbac/usuario/perfil",
              "descricao": "Usuário logado pode deletar sua própria conta",
              "eh_publica": true
            },
            {
              "id": 64,
              "codigo": "usuario:consultar",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "GET",
              "rota_template": "/rbac/usuario",
              "descricao": "Usuário logado pode listar outros usuários",
              "eh_publica": false
            },
            {
              "id": 65,
              "codigo": "usuario:consultarPorId",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "GET",
              "rota_template": "/rbac/usuario/:id",
              "descricao": "Usuário logado pode listar dados DETALHADOS de outros usuários",
              "eh_publica": false
            },
            {
              "id": 63,
              "codigo": "usuario:consultarLogado",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "GET",
              "rota_template": "/rbac/usuario/logado",
              "descricao": "Usuário logado pode obter seus próprios dados",
              "eh_publica": true
            },
            {
              "id": 70,
              "codigo": "usuario:cadastrar",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "POST",
              "rota_template": "/rbac/usuario",
              "descricao": "Cadastrar novos usuários no sistema",
              "eh_publica": false
            },
            {
              "id": 62,
              "codigo": "usuario:login",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "POST",
              "rota_template": "/rbac/usuario/login",
              "descricao": "Autenticar usuário e obter token de acesso",
              "eh_publica": true
            },
            {
              "id": 69,
              "codigo": "usuario:alterar",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "PUT",
              "rota_template": "/rbac/usuario/:id",
              "descricao": "Alterar informações de usuários do sistema",
              "eh_publica": false
            },
            {
              "id": 66,
              "codigo": "usuario:alterarPerfilLogado",
              "modulo": "rbac",
              "recurso": "Usuários",
              "metodo": "PUT",
              "rota_template": "/rbac/usuario/perfil",
              "descricao": "Usuário logado pode alterar seu próprio perfil",
              "eh_publica": true
            }
          ]
        }
    ]
    }
  ];