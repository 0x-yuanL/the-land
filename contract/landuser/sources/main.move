module landuser::main {
    use aptos_framework::event;
    use aptos_framework::object::{Self, ExtendRef, Object};
    use aptos_token_objects::collection;
    use aptos_token_objects::token::{Token, Self};
    use std::option;
    use std::signer::address_of;
    use std::string::{String, utf8};
    const ELANDUSER_NOT_EXIST: u64 = 1;

    const APP_OBJECT_SEED: vector<u8> = b"landuser";
    const LANDUSER_COLLECTION_NAME: vector<u8> = b"landuser Collection";
    const LANDUSER_COLLECTION_DESCRIPTION: vector<u8> = b"landuser Collection Description";
    const LANDUSER_COLLECTION_URI: vector<u8> = b"https://img0.baidu.com/it/u=2112609573,2923665802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";

    struct LanduserInfo has copy, drop, key, store {
        avatar: String
    }

    struct Landuser has key {
        parts: LanduserInfo,
        extend_ref: ExtendRef,
        mutator_ref: token::MutatorRef,
        burn_ref: token::BurnRef,
    }

    #[event]
    struct MintLanduserEvent has drop, store {
        landuser_address: address,
        token_name: String,
    }


    struct CollectionCapability has key {
        extend_ref: ExtendRef,
    }

    fun init_module(account: &signer) {
        let constructor_ref = object::create_named_object(
            account,
            APP_OBJECT_SEED,
        );
        let extend_ref = object::generate_extend_ref(&constructor_ref);
        let app_signer = &object::generate_signer(&constructor_ref);

        move_to(app_signer, CollectionCapability {
            extend_ref,
        });

        create_landuser_collection(app_signer);
    }

    fun get_collection_address(): address {
        object::create_object_address(&@landuser, APP_OBJECT_SEED)
    }

    fun get_collection_signer(collection_address: address): signer acquires CollectionCapability {
        object::generate_signer_for_extending(&borrow_global<CollectionCapability>(collection_address).extend_ref)
    }

    fun get_landuser_signer(landuser_address: address): signer acquires Landuser {
        object::generate_signer_for_extending(&borrow_global<Landuser>(landuser_address).extend_ref)
    }

    fun create_landuser_collection(creator: &signer) {
        let description = utf8(LANDUSER_COLLECTION_DESCRIPTION);
        let name = utf8(LANDUSER_COLLECTION_NAME);
        let uri = utf8(LANDUSER_COLLECTION_URI);

        collection::create_unlimited_collection(
            creator,
            description,
            name,
            option::none(),
            uri,
        );
    }

    entry fun create_landuser(user: &signer, name: String, avatar: String) acquires CollectionCapability {
        let uri = utf8(LANDUSER_COLLECTION_URI);
        let description = utf8(LANDUSER_COLLECTION_DESCRIPTION);
        let landuserInfo = LanduserInfo {
            avatar
        };

        let collection_address = get_collection_address();
        let constructor_ref = &token::create(
            &get_collection_signer(collection_address),
            utf8(LANDUSER_COLLECTION_NAME),
            description,
            name,
            option::none(),
            uri,
        );

        let token_signer_ref = &object::generate_signer(constructor_ref);

        let extend_ref = object::generate_extend_ref(constructor_ref);
        let mutator_ref = token::generate_mutator_ref(constructor_ref);
        let burn_ref = token::generate_burn_ref(constructor_ref);
        let transfer_ref = object::generate_transfer_ref(constructor_ref);

        let landuser = Landuser {
            parts: landuserInfo,
            extend_ref,
            mutator_ref,
            burn_ref,
        };
        move_to(token_signer_ref, landuser);

        event::emit(
            MintLanduserEvent {
                landuser_address: address_of(token_signer_ref),
                token_name: name,
            },
        );

        object::transfer_with_ref(object::generate_linear_transfer_ref(&transfer_ref), address_of(user));
    }

    #[view]
    public fun get_landuser_collection_name(): (String) {
        utf8(LANDUSER_COLLECTION_NAME)
    }

    #[view]
    public fun get_landuser_collection_creator_address(): (address) {
        get_collection_address()
    }

    #[view]
    public fun get_landuser_collection_address(): (address) {
        let collection_name = utf8(LANDUSER_COLLECTION_NAME);
        let creator_address = get_collection_address();
        collection::create_collection_address(&creator_address, &collection_name)
    }

    #[view]
    public fun get_landuser(landuser_obj: Object<Token>): (String, LanduserInfo) acquires Landuser {
        let aptogotchi_address = object::object_address(&landuser_obj);
        assert!(object::object_exists<Token>(aptogotchi_address), ELANDUSER_NOT_EXIST);
        let landuser = borrow_global<Landuser>(aptogotchi_address);
        (token::name<Token>(landuser_obj), landuser.parts)
    }
}
