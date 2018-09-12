#  User Input Check {{{ #
Bad: (Array.isArray(token.history.eingabeKorrekt)? token.history.eingabeKorrekt[token.history.eingabeKorrekt.length-1] === true: token.history.eingabeKorrekt === true)
Good: (Array.isArray(token.history.eingabeKorrekt)? token.history.eingabeKorrekt[token.history.eingabeKorrekt.length-1] === false: token.history.eingabeKorrekt === false)
#  }}} User Input Check #

#  Condition for SMS {{{ #
(token.history.summe > 100)
#  }}} Condition for SMS #

#  Mapper {{{ #
{p: token.history.summe}
#  }}} Mapper #
