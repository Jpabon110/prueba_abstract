import React, { Component, Fragment }from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Index from '../Event/index';
import EventDetails from '../EventDetails/index';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import ResponsePlayerContents from '../../containers/EventDetails/components/responsePlayerContents';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false,
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ loading: false });
      setTimeout(() => this.setState({ loaded: true }), 500);
    });
  }

  render() {
    const { loaded, loading } = this.state;

    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            {!loaded
            && (
            <div className={`load${loading ? '' : ' loaded'}`}>
              <div className="load__icon-wrap">
                <svg className="load__icon">
                  <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </div>
            )
            }
            <div className="dashboard container" style={{ padding: '0px' }}>
              <Navbar color="dark" light expand="md">
                <NavbarBrand href="/">
                  <a className="link_logo" >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAABDCAYAAABp9TueAAAAAXNSR0IArs4c6QAAGARJREFUeAHtXQt4VEWWvre7g4DySEgMD0VEAqwMoqPrAxUSlXU+BUd00FFRRxydEUVklFUYd2Vl2Fnd8QGOOo5vXd8EkVEHfJAE0BlHfICLEgKCIqBggoASTKe75v8vtzrVnXs7t5902jr5TurU61Sdc+ueOlV1+17DyCAUV6+tyCB7zVprQGsgyxrwZaq9AXV1+4VF6JmiZXVDMtWG5qs1oDWQXQ1kzGA0bBIXCkOUGs2h32RXJN2a1oDWQKY0kDGDAWNxLTsthHlR6VtrD8yUAJqv1oDWQPY0kBGDUbykbiQsxZF7xRD7BYPha7Inkm5Ja0BrIFMayIjBCIXD16kdhrdx1UFvb+ykpmlaa0BroP1pIO0Go2fV+n5Qw1lRqhCi+Ltg4yVRaTqiNaA10O40kHaD0WQ2TcJypBVfU4jrBDY02p2GdIe1BrQGIhpodWNHchRi3PPCXzxzwWglyZEsqdp6gBDG5U6ZMBaDS6rrznTK02laA1oD7UMDngzGkHGGCIvwc0W/W3B8PLHCxvZf4Fykm1uZkBm+3i1Pp2sNaA3kvgY8GYwZphnGxmVnIUIvF898aZCTWFxu4G+SU14kTRjlJTV1R0XimtAa0BpoVxrwZDBsicKGMHqEhFhYPGthr1gpi5bWnYHlyMDY9Nh4czikvYxYpei41kA70UACBsMM75VJ9AuFG/9aNOfVrqqM8EEmq3FX2jTO6/F2bR/XfJ2hNaA1kLMaSMBgCNtgQBZhDDN2fP/ikOdXdaBkRUvqDseSZJQnKYVRYDSZ1lOgnsrrQloDWgM5owHPBsM0pIext+9YfpyypbbuceuoNBz25l3YYmNtc2Xpii/3zxkt6I5oDWgNeNKAZ4MBbi0ehs0axuLnRb9/5V64HOM9tSYLCdG9eftOx+NXWUSHWgNaA7mnAe8GwzRCjt1vDl4ldjV2dsyLkwgvY/IMhwe84lTRWVoDWgP7WAOeDQaOVVt5GFbfOxY0Gwck8TMRIfrPWVo3dh/Lr5vXGtAaSEADng2GEbOHEWmjT1EgQscQeA58kWkaX8Ykt0TDYf2ujBZtaEprIOc14Hqzt+65g4fh9zcbpd1ceZg+43Yj7BsujPDM1vz4rgxjeI+la46rP3ngO075iaZhT+VD1ClzqNeMtO+BjcBNwI+BD5mm+XeEGQH05TQwPh/Ip2NLgQK4Ebga+ATwdbTPtKQBbfBXwbOSZhBd8Vn0J+F9JfRhBthMjWYViVHve4DfAjcA3wTeh3a+QZgVQP+uQnv3Z6WxNhpBX3ivDAeeDjwWyHHBd8UUAOuBW4Ack0uBr6HfTQhTArR5DBjUpMSkpfJG15u9pUyEar0k6Qlj4fdHCkQRprmyfuSgxb2ralfuMc3fouMdo/LtiAhZj4uf55SXRBrbaGs/pS/KnAC8HH1ajnACLsxHCNMC4NkPjJ4EnuTAkIPjaOBFwA9Q9ly0vd6hnNckDrS25PXKyzoi91pYKddWH/i8DuXuDzwFOA1y3wq5/xd0RgHt9EQDdyP8AO1lbHJoSwi0z2vEd8LQsBa7lC9CehlwBPDfgdtQ72GEd6PvXyFMFriKSNcY6URmngDPfcdsemJ27EUZncEnzLuYs7li0NcIeAM5Ap4oP8f+SbxjfoKJ6q9hOYttsnEbwt0OvGh9q3FhDnfISzgJfHjBOTBVY8FZll7FBqBqdPmI/HLUGYIwX2AXBFlp4yqEnwLpXahwACK3Q+5sPPF7NdqiIZyidiCbNOQ8G+1xUrgN6GYsnLpUgsSbgGvAg7/0TmRyd+KXlrREOqEOdsPosb8wOhWoN2ikQ7CIWwv7mM/Qx7Ig4JttBENXyGh0KPxNviCf40j3RZ2KfjyktgWl08LRSFwKvADI/jPtYeSdiPLRMiLDK6A+Xa3ngHQzCXTF/wt4F/hyOYQlmDgEwUzgxYwD2PaTSD8OZYJWSmL/HkXxhXGq3Ig8ejMEelGSthJi/m2PiScTXQY5zoitCPkORtoY4M3AXnb+TKS/gPKf2/G0BuBNb/NXNtNzEO+bqbacOo72OBnfCpwOVO8TXucq4EtAGtXNQAL1Qj39BEhddQMS6KFx8v0EuAiYKPC6HxGn0mnIu1PJ5/3hthRqSsBgxOxh9O7h7p2Yxn1ry8qsm4QdaTipbFVR1epFYu/aTembTYrw5YXL183YfsxhO1pnJpSCJtwBA6YBua8RcUHpddBQEY4HjgTyQiYLZ6HiUUrliWjvUSVuIP4Z4peg7S8QTrPz6IF1B7I/CQH4sS7REdBOxGajwG6U5+DJOqDdjWj0PvTnLYT/AHLW7wTkJPIfwEzAeDDlLE3gOJ8EnMpIluBBtDNBaYuT0ePA/4Q+eP1joc5OeAp6on6oG04uhXZ6UgHaakRF1+uOtspiGK9CHU52juB+08cUF8opidi/Y7PR3W1ZZH5fEPDfH1PdwF4HraQjYPOzi7nLzQNxrJKORN6wNCASxkoiyfBMpV4tlB5lLJQ8kpxp5wIvQbl/AyZsLMikvQHkXIE+q16fqrN0iyMnA8n3l7g5DpCRTIZoh2NLNRY06hWQn/tlTsYiqjso0wS8F4kDgQuiMvdxxLPBQD8j7rrZu5AW2xGw8f/0VycO2MrM4qXrBvL7JKTrTx7AXV+6Vc5gimvLq7K3TkNfaHnV/gxw7pjnVLqTEj6UhFOItsPAccAnnfLzPI1GQ0Ls7CbTUwpxw44Cgx/FMKEXd1lMWtqjdtuzFMabQHPJuURJ80SiDg3NOUB6KzkBCRgMe0kSsI5SXTsf8Bl3y8xwKHgjv0/COIQXCOJ4GeLgFWbdOFk3S+GnSjtdFDoZcodSKVVeCqu8I9crEuENbZb7rSSlhZyicFmu0JPRXgJjXqnpgbR534Gics+Cy/JzMPbVceaBU0sR1A0Br0TK2y2p+47yrDw8gBWyuknvAhEnwA/U3tw6YvBK5vVcUof1o3khlBhxDTt36Px/qEur6QimkfUHuXopHflMoZMh5RqUdU+E3D2SYfIDqNNbkTGIm8Ftg00p5p2E3gehNDcOCbxhfwqUy4DDQI8BZgouAeOhCvMZkI97NikD+OxKmUkaGHg2GLj5w7CbYaMXPTtn8BlmxLtoCod+jYuHnWoxrLiqrpw1vhh+cCMcjT8517Ye5DqmpGbNCLf8dKajb37wO0LhmeqFfUPh1Q30g2iDm1caojWg6nxddFZaYteBi5zRnsaNthlx7gdIUL0PmZaucILC6EvQc5R4XpCeDQYcOb9R0s00OhQ4Cg6nY8228rJXmHn0csFCV8mCIaPlOyU+s+N9uJyus0qzyNp7P/8b/eMDRYR64MMWleQ/DMwqVK1Wqo8FXQWjcZSS9oMmoYvDoYDIuAC9KJ0KAf8i8OMsL2G2TfwZIfesCCMzcU3AkzPpcKuFvf8exphwevZHKdL+SM8GwygIdDd6F0rL3UpSLEdmQ0HcpzA27Ko9HycfLe6+aYwpXbqmP/O+HtFvCyaAZ0k7gzm6pGZdmXNeaqm4qHgvqSgHPg5OfJqOwAeL+MTld1YstX+8GTizSOAAeg/tzQWeJBN/SCHk7gL8MfBGyL0YyONUAo/uXPe0rBKJ/7sSVTrb1apxTVeQRsjTsCfsdAZTFDpd5KlgRK9VwkJJ5FPoyWDw8wE4Ru1qdJHXOkYFprE9UNiNN6EFsBp0C1sAG03BsHUObqUFTF9k6dJSyKZQtlmEkr2gqkH7HQZprY3rEW5FCzQK9AQ4C3FP5jngCRhQNQhTBvBZDSZcUm1QmLFP5wKXog98spPPYXRQ8vOJHAXZGmzcgZB7CDuB7wH/B1gKJNBYXAx9fWbF0vAPbfHk7mqFVewYU5cHP0f5lglNqZQC2U+pGwb9dyWeN6Qng2F9PqBPsesg9xm+B78a1tOaoQuXrD4RBuPoVhoSYkLxsm1dmL5tZNkHWJZUtypjJ2Cr5FJ8WpHuZaJgeTh2JQ7OgTb2Q1gCVKEZER75DsXg8aQHtbIbjZuAm590vacDd8SUo14eB9ahzQuANCb5BLxpC23sijB2zPD6PAMcDD3NRZhOGAdmB9kMP0X4F5U52vsY8dfsNC6ZVeOiFk2WlsaQ9evRHsdX3kGbNwoHNf6uNTrHXntbF6bRLEzfH6VmsDUa7V3YGeDTNRzaPkGW85txH+Tq3BhspHufCnyCym8oWA36HeBmIIHG4mzg08BK9E+6soimBhgs2Nw1fw8u/YHTgJ/HcOyLONul19EjJq89R9ei8+/HCHAn4pcCTwL2hF4uBKbNs1DaUsfdPWiDs3wsqF4HN+VdXObYap7ixUop7onlJbRpMOzPB7juKWDvYm7DyAEbqZ3CZev6wr6MddMUvoY0aYY9m18zYsDLWFxygDmCEOGrh6xKyXW/E4NmlIIVoI8H9kGDxwIXKA3TcHB5klZAWw1AuuI0HNQLDZYKJyLyZh4ZDV5PHmOqR+dDEX8KengLyGVh2gH6414RrylhF/ARi2r9j/sKtXYyDfXFrYsknaIaibRNPkn3JkMV2zQYbX0+wPS3HKUawea+PtO8w2f6bndGs3JO9drelAUH1GGfMGa7ycVN0y+31l3olp9KOgbuu0AO7AcVPqMx8EYo8bSRaIsP38wHHg+m5wPVR8GHIX5/2hrbx4wgI5954HWTM/wo0LdluFtTFP6Pog/cN2kFSOeSSN3LSOf3fq1J0260GGMp35ablmhcc7qC9fmAUIgX3BFwlPo39eU32ysGLUNBoifwGYWPhc3tM/Ezzu5OFcKm4EB4zCkvTWmTwYdrX9n+taCXpIm3IxsM2ucxmFYg83XgwXahnyFtCPJWOVZqZ4mQ43XIcwu6PdPu+vWI850UT6VbFPA9BDzHKny7Ie1WJR5L7q8k/AvonwD/qqQlS6oGgx7GICA3wfMK4hoMo+3PB9yVija2VRz4bVH16gdh9qc68hHiiKLqNaMaygfy5ko7YAA3YnC9CsbSkxmc9kYcGKJdnt5ciSw5UDkbjQdyvyNfYBYEOQF4hi0QH2T7BLLH7nGkKu8kMPArTC5VaC8kJyV5HbyUdyvzHjIwlCMPjXGi/eEYDJ5S7G7a7b7GM43PTx05aN4LtvqKqmun4EXB/C19m4AnQufWlw960SpoBu4xjOYpULWL8RK/QbmMGAy7oxvskMFhCp1REjfOQtxA9DS4JCGU7Q3y4z/kg3iC44cGgl5AJ+B8pB2DvLTsZYDXAeD5S2AqwKPglL07yPQ5+FShI6fYnbkcIcZ2foHLTYoHFoLfXYGbmBfZEUzhuwdvPwkx0zYus+KVV5lgdccHebimF9wwLaqqrYSxOV8tI2mY7NO5NGoYUcZjsUxAR4WpXHcrSRklPwR3aTB4U+UV4PrymYyfQahlQJ5KcQn2AtJOQ14QdKpwGRh0s5k0IbwIyNAL3IVC/e2C9DJSNTxk9RhQGoxhkPMCyPkMM/IFfE6C8GfmOEt1PafG3sW3XY2Ch2RdGhcox9W4yHIyRNnBPWrqTpNxM7D3dX4yHhVy8yiU0R+l/Vhpb4NCJ0RCpo7Aa4BcangFdXB/67VSeyqHG2Y5+jtZ6TM3lu9W4kmR0DPHLvecJDyPtuYCF3hBVPqjrIjwIvArUeLJkpWoqO5l8H2i0igly9OqBz7q3ktKvFKp7GgwVvpq+UozzgaOIEzzsQ0Vh37DzHH8EZcwJjoWjJMIjyJysblxyg1Ut+LwMsaXvrX2QLf8ZNMh449Q92Sl/msK7ZkEH266fQqkC3q954ot3gWrZOLZhAS6krmiuIEfAPcnlRYmQmepzuijwW+AwjNR9/8R1P3Ork8v8yqFV1Ik5NyNir8AYshawDHLpWdKxgj1/wA+J+1luW//OxoMiKvOCNE9xHFoIOyfLRMX16w5C+X7yngC4Rny9yV2HbqILiD2CwZDrh6PS6W4ybgIvVGA7qLfLsjBox652cmegj0o1csuORC8z2yrFsoMQZkjlXJvKHQ+kr+GUB8pgt0LHXBTNFngMkICJpzEfkaO8jtQ+QnJACGNGJdNKQH4LgYDdSxzb4rP2vB6JwSo0wn4Z1RKZBJKqI1EC7cyGMVV647h90LcGYmXt1UMWCvz8cnDiKcg0zyFcCmDIRExAtxART3XWRYme2K/qvXqfkNbzRwEZR9h41EIjwWeAhwPfBaV6RHQw5AwHRd7vYwkGC5E+XVKnUfRRh8lHkUij8duTwE72BncBHzRpvMygG45+54L3GkLSNnnQRc03AkB6tDQliuVEvUuZFW1XikSL5AZKYbTUZ/jWcJQEPwR4lSgpzGMcqejzv8Dr5BMciFsZTBCRvC6eB3zG4G7ZX5hzbqh8C7KZTzREEZggvyKOzdQTZ+pXsBodkIU7/QFL4lOjBu7BbkrbHwf4TvAN4F0jbnBqs4mPFZT17SIegfcDBDFepktQwJd0Hdx0fkjp4iOQQeAY5H3MXAYUMJN4CHdY5mWdyFkrINQ3KiU0BMEjYZ6LWRevFAdo1+h4AvxCrvloT+fIE/17FSvxa1am+ng+z0KjQPeqRSmjLcDt0De+4GnAvsBC4A8UioB8jBgOnAlynES6g/MKYgMZvaqeMmGXjhFPs+9h+aKr8sHVMl8UzTzDDx5wANbTQ07L5YMxP4BfI2s1XcsZDbfsDMFyjRbElKmOLNPA47GRQ6nwg31n0H9qQqPXqCZ9h36zI8WcXByluXMcwhQwh9Q91EZyfcQslL+OxQ5jwP9JyUel4QeS1FA9QQeAM+muJXiZ6qTFD3SU+IX95aLPvG9rdejNJdiu5Ra3e00Gqr1wD02ciy+B5wFpEcigadJNDRLZcK+DANq42GxZyI8hgI1TaWhgAVFy+qstZgv6OsUNoI8xkoJMDlPAs+9ytiDe1ZYL1U514kpLuZg/rYFea845SONxmyNQx6NQTOQs/g3wC+A9D6qIBMvSFoAvO5AH2kUbgFyYBPogh5pUdH/diB6A+o8FJ2c1thH4PaSzdFJL+lojN7SfJvRBx4Z3oRyXYAH2uW7Q2//Cl2866H+RJSRSzleO8/GxoX3y0jnjXuonU8vY7FNpxxApgcgG/VzK3A8sHMMU07aUh41i4bkeeBt4EEdZwo2g7EcI2wjFK+hyGzNt3vXbwpvxCxeEq/CPs8zjart5YPTMgtkShYMEA4KziyjgNzJPwTIzdUG4PvARUC+kYlGQ4NHDUCvHK8LgHKM8sNJN3is7loMfC9HptwrEKDPAt9trhWSzEA73VD1PGAF8ATgQUA5aTeC5kT2NyAn0HnoA8dLTkHEYOAR7MvwC9FHcqp3Lp0JGL6jtlUM/NAlO+eSMVBoLHAandqyJ+cE0x1KWQMYG13BhC9DpsHIeaA7ZAE6PlnSuR42m1n5Lmfa1IDBwF+rclmkQWsgSgMYFzvbi7Fgxy0Pg2/1DhmhqihJcjliGkFfB/PQ+uGDNuVyN3XftAbyTQOWhxEyw+3Gu7AuADdmvzcn5dvF0PJoDeS6BszSmtWHNgm8+Up5XiDXO231Dy8e7lDY/WD5LtF20WfdSa2Bdq6BQFCYp2Fd8g+8Lq/didK0Y2c5Ou12xNru5NEd1hrIdQ14shIz4H3MmTn//pwTxuer3c8IVG65+czPcq5vukNaA3moAXkG3KZoOJy+ss1C2ShgGitg5SoNv1nZMP2nmXygJRvS6Da0BtqVBjx5GJSo8NYX+UBL9gGPgqKT7wjDnNch4K/8atroT7PfCd2i1oDWADXg2cPAHgdeYZHW33G4XwHrS/HmUp8h5hmmf179zWP08am7tnSO1kDWNODdYBiCDx7xicVMQRMeYFmM35JUduzkn7/5hjFfZ6ohzVdrQGsgOQ0kYDCs70yk1WDgYKYRS41FPmFWhjt0/kvDTaP0byuSu466ltZAVjTg2WBgJyGENUlBqr3Cl9J2GqbAUag5r+OB/lc3/2rM7lR56vpaA1oD2dGAZ4OB7iT/WwgTH6c1zAXCZ1b2Khvw+qrzhqTy/oLsaEa3ojWgNdBKAwkYDGsPoxUDtwQsN7bgWGW+z2dUDh3evaa6ooLvozC2u1XQ6VoDWgM5r4EEDAZ/bdnWyaq5wcTJhgj45tVPO+ttbGJaFapzXg26g1oDWgNeNODZYODOd1ySYKmxGnnz/H5/5de/HcOXw1hgTpeUDrUGtAbyRQOeDQY2KkMRB8M0P6Qnsfdpy7P105b5Mhq0HFoDbWjAu8HAq8PwVu+aAn9gnn7asg2t6mytgTzVwD8B0uRfDJOVp44AAAAASUVORK5CYII=" alt="Logo" className="header__logo" />
                  </a>
                </NavbarBrand>
              </Navbar>
              <br />
              <Switch>
                <Route exact path="/">
                  <Index />
                </Route>
                <Route path="/event/:id">
                  <EventDetails />
                </Route>
                <Route path="/response/:id/:playerId">
                  <ResponsePlayerContents />
                </Route>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }

}

export default App;
