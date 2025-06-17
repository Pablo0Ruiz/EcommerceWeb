
const LegalPage: React.FC = () => (
    <main style={{
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
        maxWidth: 900,
        margin: 'auto',
        lineHeight: 1.6 as number,
    }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2rem', marginBottom: '1rem' }}>
            AVISO DE PRIVACIDAD DE MATEZONE
        </h1>
        <p><strong>Fecha de última actualización:</strong> [Indicar Fecha]</p>
        <p>
            En Matezone, valoramos tu privacidad y nos comprometemos a proteger tu información personal. Este Aviso de
            Privacidad describe cómo Matezone, con domicilio en P.º de la Castellana, 89, Tetuán, 28046 Madrid), en calidad
            de Responsable del Tratamiento, recopila, utiliza, comparte y protege tu información personal cuando visitas o
            realizas compras en nuestro sitio web{' '}
            <a href="https://www.matezone.es" target="_blank" rel="noopener noreferrer">www.matezone.es</a>.
        </p>
        <p>
            Al utilizar nuestro Sitio Web, aceptás las prácticas descritas en este Aviso de Privacidad. Te recomendamos
            leerlo detenidamente.
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>1. Responsable del Tratamiento de tus Datos Personales</h2>
        <p>El responsable del tratamiento de tus datos personales es:</p>
        <ul>
            <li><strong>Denominación Social:</strong> </li>
            <li><strong>Nombre Comercial:</strong> Matezone</li>
            <li><strong>NIF/CIF:</strong> 2985418975</li>
            <li><strong>Domicilio Social:</strong> P.º de la Castellana, 89, Tetuán, 28046 Madrid</li>
            <li><strong>Correo Electrónico de Contacto:</strong> <a href="mailto:matezone@gmail.com">matezone@gmail.com</a></li>
        </ul>
        <p>
            Para cualquier cuestión relativa a la protección de tus datos personales, puedes contactarnos a través de la
            dirección de correo electrónico matezone@gmail.com.
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>2. ¿Qué Información Personal Recopilamos?</h2>
        <p>
            Recopilamos tu información personal para proporcionar y mejorar continuamente nuestros productos y servicios.
            Los tipos de información personal que recopilamos son:
        </p>
        <ul>
            <li>
                <strong>Información que nos proporcionas directamente:</strong>
                <ul>
                    <li>
                        <strong>Datos de registro y cuenta:</strong> Cuando creas una cuenta en Matezone, recopilamos tu nombre, apellidos, dirección de correo electrónico y nombre de usuario.
                    </li>
                    <li>
                        <strong>Datos de pedido y envío:</strong> Cuando realizas un pedido, recopilamos las direcciones de envío que nos facilitas, así como información necesaria para procesar tu pedido (aunque no almacenamos datos de pago, ver sección 6).
                    </li>
                    <li>
                        <strong>Comunicaciones:</strong> Cuando te pones en contacto con nosotros por correo electrónico u otros medios, podemos guardar un registro de esa correspondencia.
                    </li>
                    <li>
                        <strong>Otra información:</strong> Cualquier otra información que decidas proporcionarnos voluntariamente (por ejemplo, opiniones sobre productos).
                    </li>
                </ul>
            </li>
            <li>
                <strong>Información que recopilamos automáticamente:</strong>
                <ul>
                    <li>
                        <strong>Información técnica y de uso:</strong> Cuando visitas nuestro Sitio Web, podemos recopilar automáticamente cierta información sobre tu dispositivo (como tu dirección IP, tipo de navegador, sistema operativo) e información sobre tu interacción con nuestro Sitio Web (páginas visitadas, productos vistos, términos de búsqueda). Esta información se recopila generalmente mediante cookies y tecnologías similares (consulta nuestra Política de Cookies para más detalles).
                    </li>
                </ul>
            </li>
            <li>
                <strong>Información de pasarelas de pago:</strong> No recopilamos ni almacenamos directamente los datos completos de tu tarjeta de crédito o débito. Cuando realizas un pago, eres redirigido a la pasarela de pago segura de nuestro proveedor (ej. Redsys). Dicho proveedor procesa tu información de pago y nos comunica únicamente la confirmación de la transacción.
            </li>
        </ul>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>3. ¿Con Qué Finalidad y Base Legal Tratamos tus Datos Personales?</h2>
        <p>Tratamos tus datos personales para los siguientes fines y con las siguientes bases legales:</p>
        <ul>
            <li>
                <strong>Gestionar tu registro como usuario del Sitio Web:</strong> Para identificarte como usuario y darte acceso a las diferentes funcionalidades disponibles.
                <br />
                Base Legal: Ejecución de un contrato (las Condiciones de Uso que aceptas al registrarte).
            </li>
            <li>
                <strong>Desarrollo, cumplimiento y ejecución del contrato de compraventa de productos:</strong> Para procesar tus pedidos, gestionar el pago (a través de la pasarela externa), realizar el envío, gestionar posibles devoluciones y ponernos en contacto contigo para asuntos relacionados con tus pedidos.
                <br />
                Base Legal: Ejecución de un contrato (el contrato de compraventa que suscribes al realizar un pedido).
            </li>
            <li>
                <strong>Atender tus solicitudes y consultas:</strong> Para responder a tus preguntas o gestionar tus reclamaciones a través de nuestros canales de atención al cliente.
                <br />
                Base Legal: Consentimiento (cuando realizas la consulta) o ejecución de un contrato/medidas precontractuales (si la consulta está relacionada con un pedido o servicio).
            </li>
            <li>
                <strong>Mejora de nuestros servicios:</strong> Para analizar el uso del Sitio Web y entender cómo podemos mejorar la experiencia del usuario, nuestros productos y servicios.
                <br />
                Base Legal: Interés legítimo (para mejorar nuestros servicios y la experiencia del usuario).
            </li>
            <li>
                <strong>Marketing y comunicaciones comerciales (si procede):</strong> Para enviarte información sobre novedades, ofertas especiales, promociones y otros productos de Matezone que puedan ser de tu interés, siempre que tengamos tu consentimiento explícito para ello, o en los casos permitidos por la ley para clientes existentes sobre productos similares.
                <br />
                Base Legal: Consentimiento (puedes retirarlo en cualquier momento) o interés legítimo (para clientes existentes, sobre productos similares, ofreciendo siempre la opción de oponerse).
            </li>
            <li>
                <strong>Cumplimiento de obligaciones legales:</strong> Para cumplir con las obligaciones legales que nos sean aplicables (por ejemplo, fiscales, contables, de protección al consumidor).
                <br />
                Base Legal: Cumplimiento de una obligación legal.
            </li>
            <li>
                <strong>Prevención del fraude y seguridad:</strong> Para proteger nuestros derechos, nuestra propiedad, o la seguridad de Matezone, nuestros clientes u otros.
                <br />
                Base Legal: Interés legítimo (para proteger nuestro negocio y usuarios).
            </li>
        </ul>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>4. Cookies y Tecnologías Similares</h2>
        <p>
            Utilizamos cookies y tecnologías similares para recopilar información sobre tu actividad en nuestro Sitio Web y mejorar tu experiencia de navegación. Para obtener información detallada sobre las cookies que utilizamos, su finalidad y cómo gestionarlas, por favor, consulta nuestra política de cookies.
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>5. ¿Con Quién Compartimos tus Datos Personales?</h2>
        <p>
            No vendemos tu información personal a terceros. Solo compartimos tu información personal de la manera que se describe a continuación y únicamente cuando es necesario para las finalidades indicadas:
        </p>
        <ul>
            <li>
                <strong>Proveedores de servicios de pago:</strong> Para procesar tus pagos, compartimos la información necesaria con las pasarelas de pago seguras (ej. Redsys). Como se mencionó, no almacenamos los datos completos de tu tarjeta.
            </li>
            <li>
                <strong>Empresas de transporte y logística:</strong> Para entregar tus pedidos, compartimos tu nombre, dirección de envío y datos de contacto con las empresas de mensajería.
            </li>
            <li>
                <strong>Proveedores de servicios tecnológicos:</strong> Podemos utilizar proveedores externos para servicios como el alojamiento web, análisis de datos, servicios de correo electrónico, etc. Estos proveedores solo tendrán acceso a la información personal necesaria para realizar sus funciones y están obligados contractualmente a protegerla y utilizarla únicamente para los fines encomendados.
            </li>
            <li>
                <strong>Asesores profesionales y autoridades:</strong> Podemos revelar tu información personal a asesores legales, auditores o autoridades competentes si así lo exige la ley o si es necesario para proteger nuestros derechos o los de terceros.
            </li>
        </ul>
        <p>
            Nos aseguramos de que todos los terceros con los que compartimos tu información personal cumplan con la normativa de protección de datos aplicable y ofrezcan garantías suficientes. Si alguno de nuestros proveedores se encuentra fuera del Espacio Económico Europeo (EEE), nos aseguraremos de que la transferencia internacional de datos se realice con las garantías adecuadas (ej. Cláusulas Contractuales Tipo aprobadas por la Comisión Europea).
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>6. ¿Cuánto Tiempo Conservamos tus Datos Personales?</h2>
        <p>
            Conservaremos tus datos personales durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados, incluyendo el cumplimiento de cualquier requisito legal, contable o de reporte.
        </p>
        <ul>
            <li>
                Los datos de tu cuenta de usuario se conservarán mientras mantengas tu cuenta activa. Si solicitas la eliminación de tu cuenta, tus datos serán eliminados o anonimizados, salvo aquellos que debamos conservar por obligaciones legales.
            </li>
            <li>
                Los datos relacionados con tus compras se conservarán durante los plazos legalmente establecidos (por ejemplo, a efectos fiscales y de garantía).
            </li>
            <li>
                Para fines de marketing, conservaremos tus datos hasta que retires tu consentimiento o te opongas al tratamiento.
            </li>
        </ul>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>7. Tus Derechos de Protección de Datos</h2>
        <p>Como titular de los datos, tienes los siguientes derechos de acuerdo con el RGPD:</p>
        <ul>
            <li><strong>Derecho de Acceso:</strong> A obtener confirmación de si estamos tratando tus datos personales y, en tal caso, acceder a los mismos.</li>
            <li><strong>Derecho de Rectificación:</strong> A solicitar la corrección de los datos personales inexactos o incompletos.</li>
            <li><strong>Derecho de Supresión (al olvido):</strong> A solicitar la eliminación de tus datos personales cuando, entre otros motivos, ya no sean necesarios para los fines para los que fueron recogidos.</li>
            <li><strong>Derecho a la Limitación del Tratamiento:</strong> A solicitar la limitación del tratamiento de tus datos en determinadas circunstancias.</li>
            <li><strong>Derecho a la Portabilidad de los Datos:</strong> A recibir tus datos personales en un formato estructurado, de uso común y lectura mecánica, y a transmitirlos a otro responsable cuando el tratamiento se base en el consentimiento o en un contrato y se efectúe por medios automatizados.</li>
            <li><strong>Derecho de Oposición:</strong> A oponerte en cualquier momento, por motivos relacionados con tu situación particular, al tratamiento de tus datos personales basado en el interés legítimo. Dejaremos de tratar los datos, salvo por motivos legítimos imperiosos o el ejercicio o la defensa de posibles reclamaciones. También puedes oponerte en cualquier momento al tratamiento de tus datos con fines de marketing directo.</li>
            <li><strong>Derecho a Retirar el Consentimiento:</strong> En los casos en que el tratamiento se base en tu consentimiento, puedes retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.</li>
            <li><strong>Derecho a no ser objeto de Decisiones Individuales Automatizadas:</strong> A no ser objeto de una decisión basada únicamente en el tratamiento automatizado, incluida la elaboración de perfiles, que produzca efectos jurídicos sobre ti o te afecte significativamente de modo similar.</li>
        </ul>
        <p>
            Para ejercer estos derechos, puedes enviar una solicitud por escrito a matezone@gmail.com o a nuestra dirección postal: P.º de la Castellana, 89, Tetuán, 28046 Madrid, adjuntando una copia de tu DNI u otro documento identificativo válido.
        </p>
        <p>
            Si consideras que tus derechos de protección de datos han sido vulnerados, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>8. Seguridad de tus Datos Personales</h2>
        <p>
            Hemos adoptado medidas técnicas y organizativas apropiadas para proteger tu información personal contra la pérdida, el uso indebido, el acceso no autorizado, la divulgación, la alteración y la destrucción. Sin embargo, ningún sistema de transmisión o almacenamiento electrónico es completamente seguro, por lo que no podemos garantizar una seguridad absoluta.
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>9. Privacidad de Menores de Edad</h2>
        <p>
            Nuestros servicios no están dirigidos a menores de 16 años (o la edad mínima legalmente establecida en su jurisdicción para otorgar consentimiento para el tratamiento de datos personales). No recopilamos de forma intencionada información personal de menores sin el consentimiento verificable de sus padres o tutores. Si tienes constancia de que un menor nos ha proporcionado datos personales sin dicho consentimiento, por favor, contáctanos.
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>10. Cambios a este Aviso de Privacidad</h2>
        <p>
            Podemos actualizar este Aviso de Privacidad ocasionalmente para reflejar, por ejemplo, cambios en nuestras prácticas o por otras razones operativas, legales o reglamentarias. Cuando realicemos cambios significativos, te lo notificaremos a través del Sitio Web o por otros medios, como el correo electrónico, antes de que el cambio entre en vigor. Te recomendamos revisar este Aviso de Privacidad periódicamente.
        </p>

        <h2 style={{ color: '#2c3e50', fontSize: '1.3rem', marginTop: '2rem' }}>11. Contacto</h2>
        <p>
            Si tienes alguna pregunta o inquietud sobre este Aviso de Privacidad o nuestras prácticas de tratamiento de datos, por favor, contacta con nosotros en: <br />
            Matezone <br />
            P.º de la Castellana, 89 <br />
            Tetuán, <br />
            28046 Madrid <br />
            Email: <a href="mailto:matezone@gmail.com">matezone@gmail.com</a>
        </p>
    </main>
);

export default LegalPage;
