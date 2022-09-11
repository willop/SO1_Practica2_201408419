package main

import (
	"database/sql"
	"fmt"
	"os/exec"
	"time"

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

func getModuloRAM() string {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201408419")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	//fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
	//fmt.Println(json)
	return json

}

func getModuloCPU() string {
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201408419")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	//fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
	//fmt.Println(json)
	return json

}

func main() {
	fmt.Println("Dentro del server de go\nLeyendo modulo RAM\n")

	for true {
		query := `INSERT INTO RAM(informacion) VALUES (?);`
		result, err := conn.Exec(query, getModuloRAM())

		if err != nil {
			fmt.Println("Error en insert RAM")
			fmt.Println(err)
		}
		fmt.Println("Resultado mysql RAM")
		fmt.Println(result)

		query = `INSERT INTO CPU(informacion) VALUES (?);`
		result, err = conn.Exec(query, getModuloCPU())

		if err != nil {
			fmt.Println("Error en insert CPU")
			fmt.Println(err)
		}
		fmt.Println("Resultado mysql CPU")
		fmt.Println(result)

		time.Sleep(5 * time.Second)
	}

}
