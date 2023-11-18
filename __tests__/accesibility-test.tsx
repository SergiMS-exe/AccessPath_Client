import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackHeader } from '../src/components/Headers/StackHeader';
import renderer, { ReactTestInstance } from 'react-test-renderer';
import DrawerHeader from '../src/components/Headers/DrawerHeader';
import { SearchBar } from '@rneui/themed';
import MainButton from '../src/components/MainButton';
import { MyInput } from '../src/components/MyInput';
import PhotoCarousel from '../src/components/PhotoCarousel';
import { Photo, Site } from '../@types/Site';
import { AddEditRating } from '../src/components/AddEditRating';
import { Valoracion } from '../@types/Valoracion';
import { ListCard } from '../src/components/Card/ListCard';

jest.mock('@react-navigation/native');
import { useRoute, useNavigation } from '@react-navigation/native';
const useRouteMock = useRoute as jest.Mock;
const useNavigationMock = useNavigation as jest.Mock;

describe('El boton de navegacion hacia atras', () => {

    beforeEach(() => {
        useNavigationMock.mockImplementation(() => ({ goBack: jest.fn(), navigator: jest.fn() }));
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    const tree = renderer.create(<StackHeader />).root;
    const backButton = tree.findAllByType(TouchableOpacity)[0];

    it('debe tener accessibilityHint', () => {
        expect(backButton.props.accessibilityHint).toBe('Volver a la pantalla anterior');
    });

    it('debe tener accessibilityLabel', () => {
        expect(backButton.props.accessibilityLabel).toBe('Volver');
    })

    it('debe tener accessibilityRole', () => {
        expect(backButton.props.accessibilityRole).toBe('button');
    });

    it('debe ser accesible', () => {
        expect(backButton.props.accessible).toBe(true);
    });
});


describe('El boton de navegacion lateral', () => {

    let tree: ReactTestInstance;
    let drawerButton: ReactTestInstance;

    beforeEach(() => {
        useRouteMock.mockResolvedValue({ name: 'Home' });
        tree = renderer.create(<DrawerHeader />).root;
        drawerButton = tree.findAllByType(TouchableOpacity)[0];
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe tener accessibilityHint', () => {
        expect(drawerButton.props.accessibilityHint).toBe('Abrir el menu lateral');
    });

    it('debe tener accessibilityLabel', () => {
        expect(drawerButton.props.accessibilityLabel).toBe('Menu lateral');
    })

    it('debe tener accessibilityRole', () => {
        expect(drawerButton.props.accessibilityRole).toBe('button');
    });

    it('debe ser accesible', () => {
        expect(drawerButton.props.accessible).toBe(true);
    });

});

describe('La barra de busqueda', () => {

    let tree: ReactTestInstance;
    let searchBar: ReactTestInstance;

    beforeEach(() => {
        useRouteMock.mockReturnValue(useRoute)
        tree = renderer.create(<DrawerHeader searchBar={true} />).root;
        searchBar = tree.findByType(SearchBar);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe tener accessibilityLabel', () => {
        expect(searchBar.props.accessibilityLabel).toBe('Buscador de sitios');
    });

    it('debe tener accessibilityValue', () => {
        expect(searchBar.props.accessibilityValue).toBeTruthy();
    });

    it('debe tener accessibilityRole', () => {
        expect(searchBar.props.accessibilityRole).toBe('search');
    });

    it('debe ser accesible', () => {
        expect(searchBar.props.accessible).toBe(true);
    });

});

describe('El boton principal', () => {

    let tree: ReactTestInstance;
    let mainButton: ReactTestInstance;
    const titulo = 'Prueba';

    beforeEach(() => {
        useRouteMock.mockReturnValue(useRoute)
        tree = renderer.create(<MainButton title={titulo} onPress={() => { }} />).root;
        mainButton = tree.findByType(TouchableOpacity);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe tener accessibilityLabel', () => {
        expect(mainButton.props.accessibilityLabel).toBe(titulo);
    });

    it('debe tener accessibilityRole', () => {
        expect(mainButton.props.accessibilityRole).toBe('button');
    });

    it('debe ser accesible', () => {
        expect(mainButton.props.accessible).toBe(true);
    });
});

describe('El input principal', () => {

    let tree: ReactTestInstance;
    let mainInput: ReactTestInstance;
    const titulo = 'Prueba';

    beforeEach(() => {
        useRouteMock.mockReturnValue(useRoute)
        tree = renderer.create(<MyInput title={titulo} />).root;
        mainInput = tree.findByType(View);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe tener accessibilityHint', () => {
        expect(mainInput.props.accessibilityHint).toBe('introduzca: ' + titulo);
    });

    it('debe tener accessibilityRole', () => {
        expect(mainInput.props.accessibilityRole).toBe('text');
    });

    it('debe tener accessibilityValue', () => {
        expect(mainInput.props.accessibilityValue).toBeTruthy();
    });

    it('debe ser accesible', () => {
        expect(mainInput.props.accessible).toBe(true);
    });
})

describe('Las fotos del sitio', () => {
    let tree: ReactTestInstance;
    let foto: ReactTestInstance;
    const fotos: Photo[] = [
        {
            _id: '1',
            base64: 'base64',
            usuarioId: '1',
            alternativeText: 'alternativeText',
        },
        {
            _id: '2',
            base64: 'base64',
            usuarioId: '1',
            alternativeText: 'alternativeText',
        }
    ];

    beforeEach(() => {
        useRouteMock.mockReturnValue(useRoute);
        useNavigationMock.mockImplementation(() => ({ goBack: jest.fn(), navigator: jest.fn() }));
        tree = renderer.create(<PhotoCarousel photos={fotos} />).root;
        foto = tree.findAllByType(TouchableOpacity)[0];
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe tener accessible', () => {
        expect(foto.props.accessible).toBe(true);
    });

    it('debe tener accessibilityValue', () => {
        expect(foto.props.accessibilityRole).toBe('button');
    });

    it('debe tener accessibilityLabel', () => {
        expect(foto.props.accessibilityLabel).toBe(fotos[0].alternativeText);
    })

})

describe('Los botones de valoracion', () => {
    let treeWithoutValoracion: ReactTestInstance;
    let treeWithValoracion: ReactTestInstance;
    let botonAdd: ReactTestInstance;
    let botonEditar: ReactTestInstance;
    let botonEliminar: ReactTestInstance;

    const site = {} as Site;
    const valoracion = {} as Valoracion

    beforeEach(() => {
        useRouteMock.mockReturnValue(useRoute)
        treeWithoutValoracion = renderer.create(<AddEditRating calledFrom='site' site={site} />).root;
        treeWithValoracion = renderer.create(<AddEditRating calledFrom='site' site={site} valoracion={valoracion} />).root;
        botonAdd = treeWithoutValoracion.findByType(TouchableOpacity);
        botonEditar = treeWithValoracion.findAllByType(TouchableOpacity)[0];
        botonEliminar = treeWithValoracion.findAllByType(TouchableOpacity)[1];
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe tener accessibilityLabel', () => {
        expect(botonAdd.props.accessibilityLabel).toBe('Añadir Valoración');
        expect(botonEditar.props.accessibilityLabel).toBe('Editar Valoración');
        expect(botonEliminar.props.accessibilityLabel).toBe('Eliminar Valoración');
    });

    it('debe tener accessibilityRole', () => {
        expect(botonAdd.props.accessibilityRole).toBe('button');
        expect(botonEditar.props.accessibilityRole).toBe('button');
        expect(botonEliminar.props.accessibilityRole).toBe('button');
    });

    it('debe ser accesible', () => {
        expect(botonAdd.props.accessible).toBe(true);
        expect(botonEditar.props.accessible).toBe(true);
        expect(botonEliminar.props.accessible).toBe(true);
    });
})

describe('Los sitios en lista', () => {
    let tree: ReactTestInstance;
    let sitio: ReactTestInstance;
    const site = { nombre: "Zara", direccion: "Oviedo" } as Site;

    beforeEach(() => {
        useRouteMock.mockReturnValue(useRoute)
        tree = renderer.create(<ListCard site={site} />).root;
        sitio = tree.findByType(TouchableOpacity);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe tener accessibilityLabel', () => {
        expect(sitio.props.accessibilityLabel).toBe(site.nombre);
    });

    it('debe tener accessibilityHint', () => {
        expect(sitio.props.accessibilityHint).toBe("Ver detalles de " + site.nombre + " en " + site.direccion);
    });

    it('debe tener accessibilityRole', () => {
        expect(sitio.props.accessibilityRole).toBe('button');
    });

    it('debe ser accesible', () => {
        expect(sitio.props.accessible).toBe(true);
    });
})