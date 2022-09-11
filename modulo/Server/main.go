package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"

	_ "github.com/go-sql-driver/mysql"
)

/*
type InfoCPU struct{
	Informacion string 'json:""'
}*/

var conn = MySQLConn()

func MySQLConn() *sql.DB {
	connString := "root:root@tcp(34.171.251.3:3306)/practica2"
	conn, err := sql.Open("mysql", connString)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Conn MySQL")
	}
	return conn
}

func getModuloCPU() string {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201408419")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
	fmt.Println(json)
	return json

}

func inserCPU(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	//json.NewDecoder((request.Body)).Decode(&usr)
	query := `INSERT INTO CPU(informacion) VALUES (?);`
	result, err := conn.Exec(query, getModuloCPU())
	if err != nil {
		fmt.Println("Error en insert CPU")
		fmt.Println(err)
	}
	fmt.Println(json.NewEncoder(response).Encode(result))
	json.NewEncoder(response).Encode(result)

}

func main() {
	fmt.Println("Dentro del server de go\nLeyendo modulo cpu\n")
	var version string
	err2 := MySQLConn().QueryRow("INSERT INTO CPU(informacion) VALUES (" + getModuloCPU() + ");").Scan(&version)
	if err2 != nil {
		fmt.Println(err2)
		fmt.Println("ERROR en CPU")
	}
	fmt.Println(version)

	/*router := mux.NewRouter()
	err := http.ListenAndServe(":8000", router)
	if err != nil {
		fmt.Println(err)
	}*/
	/*
		for true {
			cmd := exec.Command("sh", "-c", "cat /proc/ram_201408419")
			salida, err := cmd.CombinedOutput()
			if err != nil {
				fmt.Println(err)
			}
			json := string(salida[:])
			fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
			fmt.Println(json)

			cmd = exec.Command("sh", "-c", "cat /proc/cpu_201408419")
			salida, err = cmd.CombinedOutput()
			if err != nil {
				fmt.Println(err)
			}
			json = string(salida[:])
			fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
			fmt.Println(json)

			time.Sleep(10 * time.Second)
		}*/

}
