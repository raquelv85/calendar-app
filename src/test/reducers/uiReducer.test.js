import { uiReducer } from '../../reducers/uiReducer';

const initState = {
  modalOpen: false,
}


describe('pruebas en uiReducer', () => {

  test('debe de retornar el estado por defecto', () => {
    const state = uiReducer( initState, {} );

    expect( state ).toEqual( initState )
  })

})