export const QR = {
  TITLE: 'Escáner QR',
  BACKWARD: 'Volver',
  ERROR: 'Error al leer el QR',
  TRY: 'Probar otra vez',
  LOADING: 'Cargando...',
  ADD_DID:
    'Escanea el QR para: Solicitar una acreditación, compartirla, o vincular tu perfil al de una organización'
}

export const ONBOARDING = {
  LINK_HEADER: 'Más información',
  FIRST_SCREEN: {
    TITLE: 'Inside',
    SUBTITLE:
      'La aplicación que te permite guardar de forma segura tu documentación en el móvil.'
  },
  SECOND_SCREEN: {
    TITLE: 'Guarda o comparte información',
    SUBTITLE:
      'Utiliza el escáner de la aplicación para escanear un código QR y guardar la información acreditada que te emitan las organizaciones. Usa el mismo procedimiento cuando una organización te solicite información, y podrás decidir qué información deseas compartir.'
  },
  THIRD_SCREEN: {
    TITLE: 'Revocar información',
    SUBTITLE:
      'En el momento que desees dejar de compartir información con una institución, puedes revocar su acceso desde el listado de accesos. Accede a él desde el menú de navegación inferior.'
  },
  SKIP: 'Saltar',
  BUTTON: 'Comenzar'
}

export const FILTER_TEXT = 'Filtro'

export const REGISTER = {
  TITLE: 'Registro',
  SUBTITLE: 'Añade seguridad a tu aplicación creando un PIN de seguridad',
  PIN: 'Pin de Seguridad',
  SECOND_PIN: 'Repetir Pin',
  CONDITIONS: 'Aceptar términos y condiciones',
  RECOVERY: 'Recuperar acceso',
  BUTTON: 'Comenzar',
  LOADING: 'Creando usuario...',
  ERROR: 'Los códigos no son iguales',
  ERROR_SAVE: 'Error guardando tu DID, inténtalo de nuevo',
  CREATING_DID: 'Generando identidad digital...',
  QR_SUBTITLE:
    'Visita la oficina de una organización y solicita que creen tu identidad digital. Te generarán un código QR para que la vincules a tu móvil'
}

export const SECURITY_PHRASE = {
  TITLE: 'Frase de seguridad',
  SUBTITLE:
    'Esta frase de seguridad permite recuperar tu cuenta en caso de que olvides el acceso. Recomendamos que la memorices o copies en un lugar seguro. Puedes consultarla siempre que lo necesites tras iniciar sesión. Por seguridad, nunca la reveles a otra persona.',
  HIDDEN_TITLE: 'Pulse aquí para revelar su frase de seguridad',
  BUTTON: 'Continuar'
}

export const LOGIN = {
  REGISTER_LINK: 'Ir a registro',
  TITLE: 'Inicio de sesión',
  PIN: 'Pin de Seguridad',
  RECOVERY: '¿Tienes problemas de acceso?',
  BUTTON: 'Comenzar',
  ERROR: 'Pin incorrecto'
}

export const ALERT = {
  CREATION_SUCCESS: {
    TITLE: 'Registro completo',
    SUBTITLE: 'Se ha creado su identidad digital en su aplicacion \n'
  },
  LINKING_SUCCESS: {
    TITLE: 'Registro completo',
    SUBTITLE: 'Se ha registrado su identidad digital en la organización \n'
  }
}

export const TERMS = {
  TITLE: 'Terminos y Condiciones',
  SECTION:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu mauris, varius ut commodo eu, eleifend id sem. Quisque ut nibh aliquet, ultrices enim non, egestas magna. Donec eu felis quis lorem facilisis euismod ac id justo. Etiam et massa ex. Duis lacinia id sapien nec vehicula. Sed blandit rutrum cursus. Integer orci nunc, rhoncus id diam vitae, scelerisque euismod massa. Praesent feugiat semper luctus.',
  INFO: 'Si ya tienes cuenta ve a Iniciar sesión',
  BACK: 'Volver'
}

export const RECOVERY = {
  TITLE: 'Recuperar acceso',
  SUBTITLE:
    'Para volver a acceder a tu aplicación debes introduccir tu frase de seguridad y crear un pin de acceso nuevo. ',
  FORM_PLACEHOLDER: {
    SECURITY_KEY: 'Frase de Seguridad',
    PIN: 'Nuevo Pin',
    REPIN: 'Repetir Pin'
  },
  BUTTON: 'Recuperar',
  BACK: 'Volver',
  ERROR_PIN: 'Los códigos no son iguales',
  ERROR_PHRASE: 'La frase de seguridad no es correcta',
  LOADING: 'Cambiando Pin...',
  SUCCESS: 'Pin cambiado correctamente'
}

export const CREDENTIAL_SHARE_INFO = {
  TITLE: 'Guardar acreditación',
  REJECT: 'Rechazar',
  SUBTITLE: 'le ha emitido una acreditación del tipo:',
  LOADING: 'Guardando...',
  ALERT: {
    SUCCESS: {
      TITLE: 'Credenciales Guardadas',
      SUBTITLE:
        'Se ha guardado correctamente las credenciales compartidas por la organización \n'
    },
    EXIST: {
      TITLE: 'Credenciales ya existentes',
      SUBTITLE: 'Esta credencial ya estaba guardada en su dispositivo \n'
    }
  },
  ERRROR: {
    ENTITY:
      'No se pudo obtener información de la institución. Vuelve a intentarlo más tarde',
    SAVE: 'Algo salió mal, vuelve a intentarlo'
  },
  BUTTON: 'Guardar'
}

export const CREDENTIAL_DESCRIPTION = {
  STATUS: 'Estado:',
  ISSUER: 'Emisor:',
  DATE: 'Fecha de emisión:',
  NAME: 'Nombre:',
  LAST_NAME: 'Apellidos:',
  SEX: 'Sexo:',
  BIRTHDATE: 'Fecha de nacimiento:',
  NIE: 'NIE:',
  ORGANIZATION: 'Organización:',
  TOWN: 'Lugar:',
  TOWN_DESCRIPTION: 'Padrón Municipal de',
  TOWN_TEXT: 'Padrón Municipal de',
  ADDRESS: 'Empadronado en:',
  NUCLEUS: 'Núcleo / Diseminado:',
  DOCUMENT: 'Documento:',
  DOCUMENT_LINK: 'Pulse para mostrar',
  TYPE: 'Tipo de acreditación:',
  TYPE_PDF: 'PDF',
  RECORD_NUMBER: 'Número de expediente:',
  REQUEST_REASON: 'Razón de la solicitud:',
  STATE_CERTIFIER: 'Certificador del estado:',
  REQUEST_DATE: 'Fecha de solicitud:',
  TRANSACTION_STATE: 'Estado de la tramitación:',
  REQUEST_FORMALIZATION_DATE: 'Fecha de formalización de la solicitud:',
  FILIATION: 'Filiación:',
  BIRTHPLACE: 'Lugar de nacimiento:',
  BIRTHCOUNTRY: 'País de nacimiento:',
  CERTIFICATE_CERTIFIER:
    'Certificador del certificado (persona u organización):',
  ASYLUM_RECOGNITION_DATE: 'Fecha de reconocimiento de asilo:',
  RESOLUTION_NOTIFICATION_DATE: 'Fecha de resolución de la solicitud:',
  VALIDITY: 'Validez:',
  LEGAL_BASIS: 'Fundamento jurídico:'
}

export const CREDENTIAL_STATUS = {
  VALID: 'Válida',
  NOT_VALID: 'No válida',
  REVOKED: 'Revocada',
  ERROR: 'Error solicitando estado'
}

export const CREDENTIAL_PR_INFO = {
  TITLE: 'Compartir',
  REJECT: 'Rechazar',
  SUBTITLE:
    'le solicita permiso para acceder a sus datos, y consultar la información referente a',
  BUTTON: 'Compartir',
  LOADING: 'Cargando...',
  ERROR: {
    LOAD_ENTITY:
      'No se pudo obtener información de la institución. Vuelve a intentarlo más tarde',
    CREDENTIAL: 'No tienes todas las credenciales requeridas',
    SAHRE: 'Error, compruebe su conexión y vuelva a intentarlo.'
  }
}

export const CREDENTIAL_SHARE_PR = {
  TITLE: '¿Qué quiere compartir?',
  REJECT: 'Rechazar',
  SUBTITLE: 'Seleccione qué desea compartir con',
  CHECKBOX: 'Todo',
  REQUIRED: 'Credenciales obligatorias:',
  DATE: 'Fecha: ',
  STATUS: 'Estado: ',
  INFO_CHIP: 'Pulse para ver la descripción completa.',
  BUTTON: 'Compartir',
  LOADING: 'Compartiendo...',
  ERROR: {
    PRESENTATION: 'Error al procesar las credenciales, ¿Tienes internet?',
    SHARE: 'Algo salió mal, vuelve a intentarlo'
  },
  ALERT: {
    TITLE: 'Compartido',
    SUBTITLE:
      'Se ha compartido correctamente la información de tu credencial con'
  }
}

export const PRESENTATION_LIST = {
  CIF: 'CIF: ',
  DATE: 'Fecha: ',
  INFO: 'Información compartida:',
  SELECT: 'Seleccionados',
  ORDER_DATE: 'Fecha',
  SEARCHBAR: 'Buscar',
  REVOKE: {
    TITLE: 'Revocar',
    LOADING: 'Revocando presentación/es...',
    ERROR: 'No se ha podido procesar la solicitud, vuelva a intentarlo.'
  },
  ALERT: {
    TITLE: 'Atención',
    SUBTITLE:
      '¿Está seguro de que desea revocar este acceso? La acción no podrá deshacerse',
    CANCEL: 'Cancelar',
    OK: 'Revocar'
  }
}

export const HISTORIC_LIST = {
  DATE: 'Fecha: ',
  TYPE: 'Tipo: ',
  ERROR: 'No se ha podido actualizar el historial',
  ALERT: {
    TITLE: 'Revocación de acceso',
    SUBTITLE:
      'Esta acreditación ya no es válida y por tanto no puede accederse a ella \n'
  }
}

export const TOP_BAR = {
  ACCREDITATIONS_LIST: 'Acreditaciones',
  HISTORIC_LIST: 'Histórico de acciones',
  PRESENTATION_LIST: 'Autorizaciones de acceso',
  SIGN_OUT: 'Cerrar Sesión',
  ABOUT_HELP: 'Ayuda',
  TERMS: 'Términos y condiciones',
  SECURITY_PHRASE: 'Clave de seguridad',
  OPTIONS: 'Opciones',
  CANCEL: 'Cancelar'
}

export const NAVIGATION = {
  ACCREDITATION: 'Acreditaciones',
  ACCESS: 'Acceso',
  HISTORIC: 'Histórico'
}

export const ABOUT_HELP = {
  SECTIONS: [
    {
      TITLE: '¿Para qué sirve AlastriaWallet?\n',
      CONTENT:
        'El proceso migratorio tiene asociada mucha burocracia. Solicitar una nueva cuenta bancaria, poner en orden tu residencia o solicitar el empadronamiento en una nueva ciudad son solo algunos ejemplos. Para todos esos casos es necesario presentar documentación emitida por otras entidades u organizaciones oficiales.\n\npermite guardar toda la documentación emitida por distintas organizaciones en tu móvil, y poder presentarla ante las instituciones que te lo soliciten. Todo ello de forma segura y transparente.'
    },
    {
      TITLE: '¿Qué tipo de información puedo guardar?\n',
      CONTENT:
        'Actualmente ya puedes guardar en el móvil copias del NIE, de tu solicitud de empadronamiento, y documentación generada por las ONGs que colaboran en el proyecto además de la solicitud y certificado de protección internacional. Estamos trabajando para que este listado sea más amplio.'
    },
    {
      TITLE: '¿Cómo comenzar?\n',
      CONTENT:
        'Dirígete a una de las ONGs que colaboran en el proyecto e inicia con ellas el proceso de registro.  Completa el registro en tu móvil descargando la aplicación y registrándote con un PIN de acceso.\n\nUna vez completes tu registro en el móvil, escanea un Código QR que te enseñará el personal de la organización, para vincular tu cuenta a la organización. Con ello esta institución podrá emitirte información acreditada y tú a ella también. Recuerda que para acceder nuevamente a la aplicación necesitarás conocer tu PIN.'
    },
    {
      TITLE: '\n¿Pueden emitir varias organizaciones mi documentación?\n',
      CONTENT:
        'Sí, es posible. Tan sólo hace falta que tu cuenta de móvil esté vinculada a la organización. Para ello,  necesitarás dirigirte, al menos una vez, a la organización y pedir que vinculen tu cuenta. Te mostrarán un código QR que deberás escanear para ello. Desde ese momento, podrán emitirte credenciales o podrás compartir la información que quieras con ellos.'
    },
    {
      TITLE: '¿Cómo guardo una acreditación?\n',
      CONTENT:
        'La organización que desees que te emita una acreditación, te mostrará un código QR. Desde la aplicación, puedes pulsar el botón del escáner y leer el código QR. Una vez hecho te mostrará la información que contiene la acreditación y se guardará en tu móvil.'
    },
    {
      TITLE: '\n¿Cómo comparto información?\n',
      CONTENT:
        'Sólo tú puedes compartir información con otras entidades. El proceso lo inicia aquí la organización, que te solicita cierta información. Para hacerlo, te muestra un código QR. Una vez lo has escaneado desde la aplicación, podrás ver quién información sobre quién te hace esta petición, y qué te solicita. Si decides continuar, deberás seleccionar qué documentación quieres presentarle. Habrá cierta información obligatoria y otra opcional.\n\nPara completar el proceso debes pulsar “compartir”. Hasta entonces, esta institución no podrá acceder a tu documentación.'
    },
    {
      TITLE: '¿Cómo revoco el acceso a mi información?\n',
      CONTENT:
        'Una vez has compartido cierta información con una organización, ésto queda reflejado en el listado de accesos. Aquí se muestra un listado de toda la documentación a la que tienen acceso cada organización. Desde este listado puedes pulsar “revocar acceso” y elegir qué quieres dejar de compartir.\n\nUna vez dejes de compartir esta información con una organización, desaparece del listado. No obstante, puedes consultar en el histórico, que hubo un momento que compartiste ciertos datos con una organización y ahora ya no lo haces.'
    },
    {
      TITLE: '\n¿Por qué es importante el PIN de acceso?\n',
      CONTENT:
        'Los datos que guardas en esta aplicación móvil son muy importantes y valiosos. El PIN garantiza que sólo tú puedes acceder a la aplicación. Por seguridad, no compartas tu PIN con nadie, ni lo envíes por canales de comunicación o mensajería.'
    },
    {
      TITLE: '\n¿Qué pasa si olvido mi PIN?\n',
      CONTENT:
        'Si olvidas el PIN, por seguridad, para acceder nuevamente a la aplicación, deberás demostrar que eres realmente tú. Par ello deberás escribir la 12 palabras de seguridad y, una vez validadas, crear un nuevo PIN de acceso que recuerdes.'
    },
    {
      TITLE: '\n¿Qué son las 12 palabras de seguridad?\n',
      CONTENT:
        'Es una lista de palabras aleatoria. Cada usuario tiene sus propias palabras de seguridad y sólo él las conoce. Tras completar el proceso de registro se muestran por primera vez y pueden consultarse de nuevo dentro de la aplicación. Estas 12 palabras son necesarias para recuperar el PIN de acceso si lo olvidas. Es una medida de seguridad que garantiza que sólo tú puedes acceder a tus datos. Por seguridad, no compartas estas palabras de seguridad con nadie.\n\nDado que es una lista de palabras complicadas de memorizar, te recomendamos que las escribas o copies en un lugar seguro al que sólo tú tengas acceso, para poder usarlas en caso de que olvides tu PIN.'
    },
    {
      TITLE: '\n¿Qué pasa si pierdo mi móvil?\n',
      CONTENT:
        'Si pierdes el móvil, no podrán acceder a tu cuenta porque necesitan saber el PIN de acceso. Además, si intentan cambiar el PIN de acceso, necesitan conocer las 12 palabras de seguridad.\n\nSi cambias de móvil o reinstalas la aplicación, para recuperar tu información y cuenta, debes dirigirte nuevamente a cada una de las organizaciones que anteriormente te han emitido información, y solicitar que te actualicen la identidad digital. Ellas, tras identificarte, te mostrarán un código QR que deberás escanear desde la aplicación, siguiendo los mismo pasos que has seguido para registrarte inicialmente.\n\nUna vez hecho esto, podrás recuperar las acreditaciones que te emitieron, escaneando nuevamente los QR correspondientes a cada una.'
    }
  ]
}

export const TERMS_AND_CONDITIONS_CONTENT = {
  SECTIONS: [
    {
      TITLE: '\nTérminos y condiciones de uso\n',
      CONTENT:
        ''
    },
    {
      TITLE: '\nObjeto\n',
      CONTENT:
        'La aplicación tiene como objetivo guardar físicamente en el móvil, de forma segura, documentación emitida por organizaciones a los usuarios. En el diseño y desarrollo de esta app han intervenido profesionales especialistas. Para el periodo de prueba participará un grupo de usuarios pre-seleccionados por las organizaciones.\n\nLa app se pone a disposición de los usuarios para su uso personal. La plataforma web se pone a disposición de las organizaciones para la asistencia a dichos usuarios, de los que son responsables de sus datos.\n\nLa aplicación móvil funciona en un teléfono con sistema operativo Android con cámara trasera.'
    },
    {
      TITLE: '\nDerechos de propiedad intelectual e industrial\n',
      CONTENT:
        ''
    },
    {
      TITLE: '\nPolítica de privacidad\n',
      CONTENT:
        'De conformidad con lo dispuesto en las normativas vigentes en protección de datos personales, el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos y a la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (GDPR), se informa que los datos de carácter personal proporcionados mediante la aceptación de estos Términos y Condiciones, formarán parte de un fichero cuya responsabilidad reside en la organización que utilice la plataforma de Inside ID para prestar sus servicios. Cada organización dispone de una instancia a la que sólo dicha organización tiene acceso. Los datos de los usuarios se guardan en la instancia de la organización en la que han sido dados de alta o vinculados, previo consentimiento expreso.\n\nEstos datos serán tratados con la finalidad descrita en el apartado “Objeto” de este documento y serán conservados mientras dure la relación contractual objeto del uso de la aplicación, con el único objetivo de facilitar la introducción de mejoras en futuras versiones de la app. También podrá realizarse el tratamiento de la información de las instalaciones, accesos de usuarios, datos demográficos, pantallas e interacción del usuario y bloqueos y excepciones, todo ello de forma anonimizada.\n\nCualquier cambio sobre los términos y condiciones o la política de privacidad será avisado a los usuarios previa implantación.'
    },
    {
      TITLE: '\nExclusión de responsabilidad\n',
      CONTENT:
        ''
    },
    {
      TITLE: '\nLegislación y fuero\n',
      CONTENT:
        'El usuario acepta que la legislación aplicable y los Juzgados y Tribunales competentes para conocer de las divergencias derivadas de la interpretación o aplicación de este clausulado son los españoles, y se somete, con renuncia expresa a cualquier otro fuero, a los juzgados y tribunales más cercanos.'
    }
  ]
}
